import React, {PropTypes,Component} from 'react'
import TypeWriter from 'react-typewriter';

const Cursor = ({}) => {
  return (<span className="typing">|</span>)
}

const Loading = ({switchText}) => {
  return (
    <div className="text-block">
      <TypeWriter typing={1} onTypingEnd={()=>{switchText('simStart')}}>
        <h2>/---- LOADING SIMULATIONS... ----/</h2>
        <h2>[10%]</h2>
        <h2>[42%]</h2>
        <h2>[76%]</h2>
        <h2>[100%]</h2>
      </TypeWriter>
      <Cursor/>
    </div>
  )
}

Loading.propTypes = {
}

export default Loading
