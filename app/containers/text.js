import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextBlock from '../components/text-block.js'
import {updateText} from '../actions/text'
import Navbar from '../components/navbar.js'

class Text extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount() {
    this.props.updateText('Constitution',0);
  }

  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const {generation,text,allGen} = this.props
    return (
      <div className="home-wrapper">
        <Navbar textCat={this.props.textCat}/>
        <TextBlock {...{generation,text}}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  var {generation,generationConst,textCat} = state.text
  generationConst = generationConst || []
  return {
    generation:generation || 0,
    text:generationConst[generation] || "Hello World!",
    textCat:textCat || "Hello???",
    allGen:generationConst || []
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateText: (textCat,generation) => {
      dispatch(updateText(textCat,generation))
    }
  }
}

const TextContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Text)

export default TextContainer
