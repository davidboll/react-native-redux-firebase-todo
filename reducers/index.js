import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

import todos from './todos'

export default combineReducers({
  todos,
  firebase: firebaseReducer,
})
