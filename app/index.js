import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router } from 'react-router';
import useScroll from 'react-router-scroll';
import { history, store } from './history';
import routes from './routes';

render(
	<Provider store={store}>
		<Router
            history={history}
            routes={routes}
            render={applyRouterMiddleware( useScroll() )} />
	</Provider>,
	document.getElementById( 'app' )
);
