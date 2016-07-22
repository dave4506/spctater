import React, {PropTypes,Component} from 'react'
import ReactDOM from 'react-dom'

class Generation extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const {generation} = this.props
    var leftStyle = {}
    var rightStyle = {}
    if(generation == 0)
      leftStyle["display"] = "none";
    return (<div>
      <h5 id="generation">
        <span className="low">Generation </span> {generation}
      </h5>
    </div>)
  }
}

Generation.propTypes = {
}

export default Generation
