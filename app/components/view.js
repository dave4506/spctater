import React, {PropTypes,Component} from 'react'
import TypeWriter from 'react-typewriter';
import Navbar from './navbar';
import Generation from './generation';

/*

<h4 className="low">Analysis:</h4>
<h4 className="low">Sentiment:{sentiment.type} Score: {sentiment.score}</h4>
<h4 className="low">Anger:{emotions.anger}</h4>
<h4 className="low">Sadness:{emotions.sadness}</h4>
<h4 className="low">Fear:{emotions.fear}</h4>
<h4 className="low">Disgust:{emotions.disgust}</h4>
<h4 className="low">Joy:{emotions.joy}</h4>

*/

const Block = ({i,text,sentiment,emotions,consequence}) => {
  return (
    <div className="center-block">
      <div className="text">
        <Generation generation={i}/>
        <h3>{text}</h3>
        {(()=>{
          if(consequence)
            if(parseInt(consequence)>=1000)
              return <h4 className="low">People affected: {consequence/1000} billion</h4>
            else
              return <h4 className="low">People affected: {consequence} million</h4>
        })()}
        <h4 className="low">[ END ]</h4>
        <h4 className="low">------------------------------------------------</h4>
      </div>
    </div>
  )
}

class View extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentWillMount(){
    this.props.fetchText(this.props.selected || "constitution")
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps.selected != this.props.selected) {
      this.props.fetchText(this.props.selected || "constitution")
    }
  }

  render() {
    const {switchText,selected,texts,analytics} = this.props
    if(!texts) {
      return (
      <div>
        <TypeWriter typing={1}>
          <div className="header">
            <h1>Loading...</h1>
          </div>
        </TypeWriter>
      </div>)
    }
    return (
      <div>
        <Navbar switchText={switchText} textCat={selected}/>
          <div className="header">
            <h1>World: {Object.keys(texts).reverse()[0]} generations (revisions).</h1>
          </div>
          {Object.keys(texts).reverse().map((i)=>{
            const t = texts[i]
            return <Block key={i} {...Object.assign({i:(i),text:t},analytics[i])}/>
          })}
      </div>
    )
  }
}

View.propTypes = {
}

export default View
