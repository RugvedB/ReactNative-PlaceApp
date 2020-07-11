import * as FileSystem from 'expo-file-system'
import { insertPlace } from '../helper/db'
import { fetchPlaces } from '../helper/db'
import ENV from '../env'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export const addPlace = (title,image,location) => {

    return async dispatch => {

        //const reverseGeocodingApi = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
        const reverseGeocodingApi = `https://api.opencagedata.com/geocode/v1/json?key=${ENV.opencageKey}&q=${location.lat}%2C${location.lng}&pretty=1`

        const response = await fetch(reverseGeocodingApi)
        if(!response.ok){
            throw Error('Something went wrong')
        }

        const resData = await response.json()
        
        ////// UnComment this once you have googleApiKey
        // if(!resData.results){
        //     throw Error('Something went wrong')
        // }
        // const address = resData[0].formatted_address

        //Alternately i have used opencage map api which gives free 2500 requests per day
        const address = resData.results[0].formatted

        const fileName = image.split('/').pop()
        const newpath = FileSystem.documentDirectory + fileName

        try{
            await FileSystem.moveAsync({
                from: image,
                to: newpath
            })
            //SQLite
            const dbResult = await insertPlace(title,newpath,address,location.lat,location.lng)
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newpath,
                    address: address,
                    coords:{
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            })
        }
        catch(err){
            throw err
        }
        
    }

}

export const loadPlaces = () => {
    return async dispatch => {
        try{
            const dbResult = await fetchPlaces()
            dispatch({
                type: SET_PLACES,
                places: dbResult.rows._array
            })
        }
        catch(err){

        }
    }
}