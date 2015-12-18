import { combineReducers } from 'redux'
import { routeReducer as routing } from 'redux-simple-router'
import example from './example.js'

const rootReducer = combineReducers({
	example,
	routing
})

export default rootReducer