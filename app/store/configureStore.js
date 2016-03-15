import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/';

let finalCreateStore;
const middleware = [thunk];

if (__DEV__) {
    const logger = require('redux-logger');
    finalCreateStore = compose(
        applyMiddleware(...middleware),
        applyMiddleware(logger({
          collapsed: true
        }))
    )(createStore);
} else {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
}

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/', () => {
            const nextReducer = require('../reducers/');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
