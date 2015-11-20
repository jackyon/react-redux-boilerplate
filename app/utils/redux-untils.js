import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';

export function createConstants (...constants) {
  return constants.reduce((acc, constant) => {
  	if(typeof constant == 'object'){
  		s = constant.toString();
    	acc[s] = constant;
  	}else {
  		acc[constant] = constant;
  	}
    return acc;
  }, {});
}

export function createReducer (initialState, fnMap) {
  return (state = initialState, { type, payload }) => {
    const handler = fnMap[type];

    return handler ? handler(state, payload) : state;
  };
}
