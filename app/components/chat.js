import React, {PropTypes,Component} from 'react'
import TypeWriter from 'react-typewriter';

const Cursor = ({}) => {
  return (<span className="typing">|</span>)
}

class Chat extends Component {
  constructor(props){
    super(props)
    this.state={
      input:""
    }
  }

  componentWillMount(){
    this.props.monitor_text()
  }

  render() {
    const {status} = this.state
    const {messages,sendMessage} = this.props
    return (
      <div className="text-block">
        {messages.map((m,i)=>{
          var message = m.message
          if(m.from == "spctater")
            message = "[SPCTATER]: ".concat(message);
          else
            message = "[YOU]: ".concat(message);
          if(i == messages.length-1)
            return <TypeWriter key={i} typing={1}><h3>{message}</h3></TypeWriter>
          else {
            return <h3 key={i}>{message}</h3>
          }
        })}
        <form className="commentForm" onSubmit={(e)=>{e.preventDefault(); sendMessage(this.state.input); this.setState({input:""})}}>
          <input onChange={(e)=>{
            this.setState({input:e.target.value})
          }} type="text" value={this.state.input} placeholder="Hit ↩ to send response."/>
          <button type="submit" style={{display:"none"}}>you suck.</button>
        </form>
      </div>
    )
  }
}

Chat.propTypes = {
}

export default Chat
