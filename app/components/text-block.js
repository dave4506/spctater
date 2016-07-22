import React, {PropTypes,Component} from 'react'
import TypeWriter from 'react-typewriter';
import Generation from './generation';

const TextBlock = ({generation,text}) => {
  return (
    <div className="text-block">
      <TypeWriter typing={1}>
        <h1>{text}</h1>
      </TypeWriter>
      <Generation generation={generation}/>
    </div>
  )
}

TextBlock.propTypes = {
}

export default TextBlock
