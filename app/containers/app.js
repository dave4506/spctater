import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Text from './text'
import Home from './home'

class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
        <div>
          <Home/>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
