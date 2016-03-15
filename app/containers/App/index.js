import './styles/app.scss';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from '../../actions/';
import Header from '../../components/Header/';

class App extends Component {
    render() {
        const { todos, actions } = this.props;

        return (
            <div className="page-container">
                <Header todos={todos} actions={actions} />
                <div className="view-container">
                    {React.cloneElement( this.props.children, { appProps: this.props } )}
                </div>
            </div>
        );
	}
}

const mapStateToProps = ( state ) => {
    return {
        todos: state.example
	};
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        actions: bindActionCreators( TodoActions, dispatch )
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( App );
