import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import example from './example.js'

const rootReducer = combineReducers({
	example,
	routing: routeReducer
})

export default rootReducer