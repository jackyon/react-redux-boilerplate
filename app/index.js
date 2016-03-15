import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore();
const history = createHashHistory();

syncHistoryWithStore(history, store);

render(
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>,
	document.getElementById('app')
);
