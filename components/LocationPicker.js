import React, { useState, useEffect } from 'react'
import { View,Button,Text,ActivityIndicator,Alert,StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'
import MapPreview from './MapPreview'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

function LocationPicker(props) {
    const [pickedLocation, setPickedLocation] = useState()
    const [isFetching, setIsFetching] = useState(false)

    const mapPickedLocation = props.navigation.getParam('pickedLocation')

    const { onLocationPicked } = props

    useEffect(() => {
        if(mapPickedLocation){
            setPickedLocation(mapPickedLocation)
            onLocationPicked(mapPickedLocation)
        }        
    },[mapPickedLocation,onLocationPicked])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if(result.status !== 'granted'){
            Alert.alert('Insufficient permission','You need to grant camera permissions to use this app',[{text: 'ok'}])
            return false
        }
        return true
    }

    const getLocationhandler = async () => {
        const hasPermission = await verifyPermissions()
        if(!hasPermission){
            return
        }
        try{
            setIsFetching(true)
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            })
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        }
        catch(err){
            Alert.alert('Could not fetch location','Please try again later or pick a location on the map',[{text:'Okay'}])
        }
        setIsFetching(false)
    }

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map')
    }

    return (
        <View style={styles.locationPicker}>
            <TouchableNativeFeedback onPress={pickOnMapHandler}>
                <MapPreview style={styles.mapPreview} location={pickedLocation} >
                    {isFetching ? <ActivityIndicator size="large" color={Colors.primary} /> : <Text>No location chosen yet!</Text>}
                </MapPreview>
            </TouchableNativeFeedback>
            <View style={styles.actions}>
                <Button title="Get User Location" color={Colors.primary} onPress={getLocationhandler} />
                <Button title="Pick on Map" color={Colors.primary} onPress={pickOnMapHandler} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        width:"100%"
    }
})

export default LocationPicker
