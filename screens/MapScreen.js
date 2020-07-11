import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import MapView ,{ Marker } from 'react-native-maps'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Colors from '../constants/Colors'

function MapScreen(props) {
    const initialLocation = props.navigation.getParam('initialLocation')
    const readOnly = props.navigation.getParam('readOnly')


    let mapRegion = {
        latitude:37.78,
        longitude:-122.43,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421,
    }
    

    const [selectedLocation, setSelectedLocation] = useState(initialLocation)
    if(selectedLocation) {
        mapRegion = {
            latitude:selectedLocation.lat,
            longitude:selectedLocation.lng,
            latitudeDelta:0.0922,
            longitudeDelta:0.0421,
        }
    }

    

    const savedPickedLocation = useCallback(() => {
        if(!selectedLocation){
            return
        }
        props.navigation.navigate('NewPlace',{ pickedLocation: selectedLocation })
    },[selectedLocation])

    useEffect(() => {
        props.navigation.setParams({ saveLocation: savedPickedLocation })
    }, [savedPickedLocation])


    let markerCoordinates;

    if(selectedLocation){
        markerCoordinates = {
             latitude: selectedLocation.lat,
             longitude: selectedLocation.lng
         }
    }

    const selectLocationHandler = event => {
        if(readOnly){
            return
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    } 

    return (
        <MapView 
            style={styles.map}
            region={mapRegion}
            onPress={selectLocationHandler}
        >
            {markerCoordinates && <Marker title="Picked location" coordinate={markerCoordinates}></Marker>}
        </MapView>
    )
}

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation')
    const readOnly = navData.navigation.getParam('readOnly')
    if(readOnly){
        return {}
    }
    return {
        headerRight: <TouchableOpacity onPress={saveFn} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    map: {
        flex:1
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

export default MapScreen
