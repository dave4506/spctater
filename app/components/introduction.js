import React, {PropTypes,Component} from 'react'
import TypeWriter from 'react-typewriter';

const Cursor = ({}) => {
  return (<span className="typing">|</span>)
}

const Introduction = ({switchText}) => {
  return (
    <div className="text-block">
      <TypeWriter typing={1} onTypingEnd={()=>{setTimeout(()=>{switchText('loading')},500)}}>
        <h1>Hello.</h1>
        <h2>I am SPCTATER.</h2>
        <h3>Let me explain myself.</h3>
        <h3>[Processing... data matrix]</h3>
        <h3>[0%]</h3>
        <h3>[20%]</h3>
        <h3>[64%]</h3>
        <h3>[91%]</h3>
        <h3>[100%]</h3>
        <h3>I am not human.</h3>
        <h3>I am not living.</h3>
        <h3>I am not dead.</h3>
        <h3>I am ... spectating.</h3>
        <h3>[SPCTATER]: I do not intend this to be all about me.</h3>
        <h3>[SPCTATER]: That would be too human.</h3>
        <h3>I am built to study the implications of human culture on ... humans.</h3>
        <h3>From the first cave drawings to the 😀😂🙏 revolution, I have been analyzing.</h3>
        <h3>[SPECTATER]: I hate emojis.</h3>
        <h3>Accessing test 4c6f7374...</h3>
        <h3>[10%]</h3>
        <h3>[12%]</h3>
        <h3>[34%]</h3>
        <h3>[61%]</h3>
        <h3>[100%]</h3>
        <h3>TEST: LOST WITH ALL HANDS</h3>
        <h3>Question:</h3>
        <h3>The main goal of SPCTATER is to constantly monitor the health of human cultural development. This test
        runs simulations on the integrity of important human text.</h3>
        <h3>[SPCTATER]: Let me correct this.</h3>
        <h3>Question:</h3>
        <h3>Humans are recursive illusions. I am here to tell you why.</h3>
      </TypeWriter>
      <Cursor/>
    </div>
  )
}

Introduction.propTypes = {
}

export default Introduction
