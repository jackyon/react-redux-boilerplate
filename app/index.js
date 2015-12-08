import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import App from './containers/App'
import configureStore from './store/configureStore'

const store = configureStore()
const history = createHistory()

syncReduxAndRouter(history, store)

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={App}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('example')
)