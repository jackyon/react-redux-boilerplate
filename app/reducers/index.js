import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import example from './example';

const rootReducer = combineReducers({
    example,
    routing
});

export default rootReducer;
