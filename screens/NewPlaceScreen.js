import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import * as placesActions from '../store/places-actions'
import ImagePicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'

function NewPlaceScreen(props) {
    const [titleValue, setTitleValue] = useState('')
    const [selectedImage, setSelectedImage] = useState()
    const [selectedLoaction, setSelectedLoaction] = useState()

    const dispatch = useDispatch()
    
    const titleChangeHandler = text => {
        setTitleValue(text)
    }

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue,selectedImage,selectedLoaction))
        props.navigation.goBack()
    }

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath)
    }

    const locationPickedhandler = useCallback((location) => {
        setSelectedLoaction(location)
    },[])

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput onChangeText={(text) => titleChangeHandler(text)} value={titleValue} style={styles.textInput} />
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedhandler} />
                <Button 
                    title="Save Place" 
                    color={Colors.primary} 
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add New Place'
}

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 14,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})

export default NewPlaceScreen
