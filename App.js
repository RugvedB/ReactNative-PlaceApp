//https://expo.io/@rugvedb/click-places
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlacesNavigator from './navigation/PlacesNavigator'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import PlacesReducer from './store/places-reducer'
import { init } from './helper/db'

init()
.then(() => console.log('Initialized db successful'))
.catch((err) => console.log('Initialized db failed '+JSON.stringify(err)))

const rootReducer = combineReducers({
  places: PlacesReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
