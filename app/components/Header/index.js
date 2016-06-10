import './styles/styles.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
    render() {
        return (
            <ul className="unstyled">
                <Link to="home">Home</Link>
                {'  '}
                <Link to="about">About</Link>
            </ul>
        );
    }
}

export default Header;
