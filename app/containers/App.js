import '../assets/css/App.scss';
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions/index.js'
import Header from '../components/Header/Header.js'

class App extends Component {
	render() {
	    const { todos, actions } = this.props
		return (
			<div>
				<Header todos={todos}/>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
