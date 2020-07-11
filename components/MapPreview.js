import React from 'react'
import { View,Image, StyleSheet, Dimensions } from 'react-native'
import ENV from '../env'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';

const MapPreview = props => {
    console.log('In MapPreview')
    let imagePreviewUrl;
    let mapRegion;

    if(props.location){
        //imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:green%7Clabel:G%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`
        imagePreviewUrl = `https://www.google.com/maps/place/@${props.location.lat},${props.location.lng},13z/data=!3m1!4b1!4m5!3m4!1s0x3be7958ef72d8707:0x84bf6ab96e280b08!8m2!3d19.2094006!4d73.0939483`
        console.log(imagePreviewUrl)

        mapRegion = {
            latitude: props.location.lat,
            longitude: props.location.lng,
            latitudeDelta:0.0922,
            longitudeDelta:0.0421,
        }
    }

    

    

    return <TouchableOpacity style={{...styles.mapPreview,...props.style}}>
        {props.location 
            ? 
            // <Image 
            //     style={styles.mapImage} 
            //     source={{ uri: imagePreviewUrl }}
            // />
            <View style={styles.container}>
                <MapView onPress={props.onPress} region={mapRegion} style={styles.mapStyle} />
            </View> 
            : props.children}
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: "center",
        alignItems: "center"
    },
    mapImage: {
        width: '100%',
        height: '100%'
    },



    //temp
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})

export default MapPreview