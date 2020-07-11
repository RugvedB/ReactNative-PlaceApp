import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
//import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';

import PlacesListScreen from '../screens/PlacesListScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import MapScreen from '../screens/MapScreen'
import { Platform } from 'react-native';
import Colors from '../constants/Colors'

const PlacesNavigator = createStackNavigator({
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    Map: MapScreen,
    NewPlace: NewPlaceScreen,
    
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

export default createAppContainer(PlacesNavigator)