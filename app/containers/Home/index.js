import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';

class Home extends Component {
    render() {
        const metaData = {
            title: 'Home Page',
            description: 'Home Page description',
            canonical: 'http://example.com/path/to/page',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'react,meta,document,html,tags'
                }
            }
        };

        return (
            <div>
                <DocumentMeta {...metaData} />
                <p>Home Page</p>
            </div>
        );
	}
}

export default Home;
