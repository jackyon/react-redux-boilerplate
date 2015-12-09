import './styles/styles.scss'
import React from 'react'
import { Link } from 'react-router'

export default (props) => {
	return (
		<ul className="unstyled">
			<Link to="home">Home</Link>
			{ '  ' }
			<Link to="about">About</Link>
		</ul>
	)
}