import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

// containers
import App from './containers/App'
import Home from './containers/Home'
import About from './containers/About'

export default (
	<Route path="/" component={App}>
		<Route path="home" component={Home} />
		<Route path="about" component={About} />
	</Route>
)