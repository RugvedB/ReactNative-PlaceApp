import React, { useState } from 'react'
import { StyleSheet, View, Text, Button, Image, Alert } from 'react-native'
import Colors from '../constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

function ImgPicker(props) {


    const [pickedImage, setPickedImage] = useState()
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL)
        if(result.status !== 'granted'){
            Alert.alert('Insufficient permission','You need to grant camera permissions to use this app',[{text: 'ok'}])
            return false
        }
        return true
    }

    const takeImageHandler = async () => {
        
        const hasPermission = await verifyPermissions
        if(!hasPermission){
            return 
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5, //0 to 1
        })
        setPickedImage(image.uri)
        props.onImageTaken(image.uri)
    }

    return (
        <View>
            <TouchableNativeFeedback onPress={takeImageHandler} style={styles.imagePicker}>
                <View style={styles.imagePreview}>
                    {!pickedImage
                        ?
                        <Text>No image picked yet</Text>
                        : <Image source={{uri: pickedImage}} style={styles.image} />
                    }
                    
                </View>    
            </TouchableNativeFeedback>

            <View style={{marginVertical: 10}}>
                <Button 
                    title="Take Image" 
                    color={Colors.primary} 
                    onPress={takeImageHandler}
                />   
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreview:{
        justifyContent:'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    imagePicker: {
        width: '100%',
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    }
})

export default ImgPicker
