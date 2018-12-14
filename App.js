import React from 'react'
import { View } from 'react-native'
import { createStore, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import * as firebase from 'firebase'
// import { Text } from 'react-native'

import AddTodo from './AddTodo'
import Todos from './Todos'

const firebaseConfig = {
  apiKey: 'AIzaSyBH0MPJIEryCwjlwWGlJHc97zB2jto6Lko',
  authDomain: 'todos-b5142.firebaseapp.com',
  databaseURL: 'https://todos-b5142.firebaseio.com',
  projectId: 'todos-b5142',
  storageBucket: 'todos-b5142.appspot.com',
}

firebase.initializeApp(firebaseConfig)

const rootReducer = combineReducers({
  firebase: firebaseReducer,
})

const createStoreWithFirebase = compose(reactReduxFirebase(firebase))(
  createStore,
)

const store = createStoreWithFirebase(rootReducer)

const App = () => (
  <Provider store={store}>
    <View>
      <AddTodo />
      <Todos />
    </View>
  </Provider>
)

export default App
