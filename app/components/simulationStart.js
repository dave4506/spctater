import React, {PropTypes,Component} from 'react'
import TypeWriter from 'react-typewriter';

const Cursor = ({}) => {
  return (<span className="typing">|</span>)
}

class SimulationStart extends Component {
  constructor(props){
    super(props)
    this.state = {
      status:"initial"
    }
  }

  render() {
    const {status} = this.state
    const {switchText,cat,selectedCategory} = this.props
    return (
      <div className="text-block">
        <TypeWriter typing={1} onTypingEnd={()=>{this.setState({status:"cat"})}}>
          <h3>Before I give you access to the data, I should explain what is happening.</h3>
          <h3>For every text, I will extract important keywords and replace them with synonyms.</h3>
          <h3>Everytime I rewrite the text, I will run basic analysis on the new text's sentiment and overall emotion.</h3>
          <h3>I do this once an hour to save performance for other tests.</h3>
          <h3>[SPCTATER]: I have fetched all the data for your viewing pleasure.</h3>
          <h3>[SPCTATER]: Good luck human. It might be ... disturbing.</h3>
          <h3>Once you are done looking through the data, click 'Done'</h3>
        </TypeWriter>
        <div style={{opacity:(status == "initial" ? "0":"1")}} className="cat">
          {Object.keys(cat).map((k)=>{
            const c = cat[k]
            return <h3 onClick={(e)=>{selectedCategory(k); switchText('view')}} key={k} className="arrow cat-title"><span className="low">-></span> {c.public}</h3>
          })}
          <h3 onClick={(e)=>{switchText('end')}} className="done-btn">[<span className="done">done</span>]</h3>
        </div>
        <Cursor/>
      </div>
    )
  }
}

SimulationStart.propTypes = {
}

export default SimulationStart
