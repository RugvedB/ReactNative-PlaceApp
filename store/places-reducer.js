import { ADD_PLACE, SET_PLACES } from "./places-actions"
import Place from '../models/place'

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_PLACES:
            return {
                places: action.places.map(
                    p => new Place(p.id.toString(),p.title,p.imageUri,p.address,p.lat,p.lng)
                )
            }
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.image,
                action.placeData.address,
                action.placeData.coords.lat,
                action.placeData.coords.lng
            )
            return {
                places: state.places.concat(newPlace)
            }
        default: return state
    }
}