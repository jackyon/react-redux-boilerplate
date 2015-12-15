import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { createHashHistory } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'
import configureStore from './store/configureStore'
import routes from './routes'

const store = configureStore()
const history = createHashHistory()

syncReduxAndRouter(history, store)

render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>,
	document.getElementById('app')
)