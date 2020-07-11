import React, { useEffect } from 'react'
import { View,Text,StyleSheet, Platform } from 'react-native'

import { HeaderButtons,Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { FlatList } from 'react-native-gesture-handler'
import PlaceItem from '../components/PlaceItem'
import { useSelector, useDispatch } from 'react-redux'
import * as placesActions from '../store/places-actions'

function PlacesListScreen(props) {
    const places = useSelector(state => state.places.places)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(placesActions.loadPlaces())
    }, [dispatch])
    
    return (
        <View>
            <FlatList 
                data={places}
                keyExtractor={item => item.id}
                renderItem={itemData =>{ 
                    
                    return (
                        <PlaceItem image={itemData.item.imageUri} title={itemData.item.title} address={itemData.item.address} onSelect={() => {
                            props.navigation.navigate('PlaceDetail',{
                                placeTitle: itemData.item.title,
                                placeId: itemData.item.id
                            })
                        }} />
                    )
                }
            }
            />
        </View>
    )
}

PlacesListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Places',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title='Add place' 
                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'} 
                onPress={() => {
                    navData.navigation.navigate('NewPlace')
                }}
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({})

export default PlacesListScreen
