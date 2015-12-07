import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from '../reducers/'

let createStoreWithMiddleware

if (__DEV__) {
    createStoreWithMiddleware = compose(
        applyMiddleware(
            thunk,
            logger({
                collapsed: true
            })
        )
    )(createStore)
} else {
    createStoreWithMiddleware = compose(
        applyMiddleware(thunk)
    )(createStore)
}

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/', () => {
            const nextReducer = require('../reducers/')
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
