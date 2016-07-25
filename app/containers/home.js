import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Text from './text'
import Navbar from '../components/navbar.js'
import Intro from '../components/introduction.js'
import Loading from '../components/loading.js'
import SimStart from '../components/simulationStart.js'
import SimBack from '../components/simulationBack.js'
import End from '../components/end.js'

import View from '../components/view.js'

import {fetchCategory,selectedCategory,fetchText} from '../actions/text'
import {type_message,monitor_text} from '../actions/chat';

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      textState:"loading"
    }
  }

  componentDidUpdate(prevProps,prevState) {
    if(this.state.textState != prevState.textState) {
      if(this.state.textState == "simStart" || this.state.textState == "backCat") {
        this.props.fetchCategory()
      }
    }
  }

  render() {
    const {messages,monitor_text,sendMessage,cat,selectedCategory,fetchText,selected,texts,analytics} = this.props
    delete cat["status"]
    const {textState} = this.state;
    const switchText = (textState)=>{this.setState({textState})}
    switch (textState) {
      case "introduction":
        return (<Intro switchText={switchText}/>)
      case "loading":
        return (<Loading switchText={switchText}/>)
      case "simStart":
        return (<SimStart cat={cat} selectedCategory={selectedCategory} switchText={switchText}/>)
      case "view":
        return (<View cat={cat} texts={texts} analytics={analytics} selected={selected} fetchText={fetchText} switchText={switchText}/>)
      case "backCat":
        return (<SimBack cat={cat} selectedCategory={selectedCategory} switchText={switchText}/>)
      case "end":
        return (<End messages={messages} monitor_text={monitor_text} sendMessage={sendMessage} switchText={switchText} />)
      default:
        return (<div></div>)
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cat: state.cat || {},
    texts: state.text.texts,
    selected: state.text.selected,
    analytics: state.text.analytics,
    messages: state.chat.messages
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendMessage: (message)=>{
      dispatch(type_message(message))
    },
    monitor_text: ()=>{
      dispatch(monitor_text())
    },
    fetchCategory: ()=>{
      dispatch(fetchCategory())
    },
    selectedCategory: (k)=>{
      dispatch(selectedCategory(k))
    },
    fetchText: (k)=>{
      dispatch(fetchText(k))
    }
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
