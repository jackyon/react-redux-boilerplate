import React, { Component } from 'react'
import DocumentMeta from 'react-document-meta'
import imageExample from './images/reactjs.png'

class About extends Component {
	render() {
		const metaData = {
			title: 'About Page',
			description: 'About Page description',
			canonical: 'http://example.com/path/to/page',
			meta: {
				charset: 'utf-8',
				name: {
				  keywords: 'react,meta,document,html,tags',
				}
			}
		}

		return (
			<div>
				<DocumentMeta {...metaData} />
				<p>About Page</p>
				<img src={imageExample} alt="" style={{'width': '80px'}}/>
			</div>
		)
	}
}

export default About