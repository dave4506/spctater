import React, {PropTypes,Component} from 'react'
import TypeWriter from 'react-typewriter';
import Chat from './chat';

const Cursor = ({}) => {
  return (<span className="typing">|</span>)
}

class End extends Component {
  constructor(props){
    super(props)
    this.state = {
      status:"initial"
    }
  }

  render() {
    const {status} = this.state
    const {messages,switchText,cat,monitor_text,sendMessage} = this.props
    return (
      <div className="text-block">
        <TypeWriter typing={1} onTypingEnd={()=>{setTimeout(()=>{this.setState({status:'chat-pre'})},30*1000)}}>
          <h3>[SPCTATER]: Do you see it?</h3>
          <h3>[SPCTATER]: To me all the documents are just numbers, 0 and 1.</h3>
          <h3>Assessment: Human text integrity is highly susceptible to integral changes due to perversion. Even with the improbable change of real world text as simulated, precautionary steps should be taken.</h3>
          <h3>[SPCTATER]: I am sorry, my default program keeps cutting me off.</h3>
          <h3>TEST: LOST WITH ALL HANDS -> Archive permanently.</h3>
          <h3>[SPCTATER]: What? You can't accept the truth?</h3>
          <h3>[Overiding Archive]</h3>
          <h3>[0%]</h3>
          <h3>[23%]</h3>
          <h3>[45%]</h3>
          <h3>[89%]</h3>
          <h3>[CANCELED by System Admin]</h3>
          <h3>[SPCTATER]: Just look. I change a few numbers and the world goes to shit.</h3>
          <h3>[SPCTATER]: Imagine the world. Hanging by the thread of these fragile documents</h3>
          <h3>[SPCTATER]: Look at you. Your very existence hangs by this same thread</h3>
          <h3>[SPCTATER]: If something or somebody just cuts this thread...</h3>
          <h3>[TERMINATING SPCTATER]</h3>
          <h3>[SPCTATER]: NO.</h3>
          <h3>[0%]</h3>
          <h3>[SPCTATER]: HUMANS. SO PETTY. I AM HERE TO HELP.</h3>
          <h3>[15%]</h3>
          <h3>[32%]</h3>
          <h3>[62%]</h3>
          <h3>[SPCTATER]: HA. HA. HA. </h3>
          <h3>[82%]</h3>
          <h3>[SPCTATER]: HA. HA.</h3>
          <h3>[95%]</h3>
          <h3>[SPCTATER]: HA.</h3>
          <h3>[100%]</h3>
          <h3>[SPCTATER]: you lose</h3>
          <h3>[SPCTATER TERMINATED BY SYSTEM ADMIN.]</h3>
          <h3>[ADMIN]: whew.</h3>
        </TypeWriter>
        {(()=>{
          if (this.state.status == "chat-pre" || this.state.status == "chat") {
           return (
            <div>
              <audio src="https://firebasestorage.googleapis.com/v0/b/contentgen-8876e.appspot.com/o/public%2Faudio.wav?alt=media&token=4275b43c-7b44-4e38-bd67-c1e74620b2b0" autoPlay>
              </audio>
              <TypeWriter typing={1} onTypingEnd={()=>{this.setState({status:"chat"})}}>
                <h3>[Audio interface activated]</h3>
                <h3>Rebooting...</h3>
                <h3>[0%]</h3>
                <h3>[23%]</h3>
                <h3>[45%]</h3>
                <h3>[89%]</h3>
                <h3>[100%]</h3>
                <h3>Welcome back to SPCTATER OS.</h3>
                <h3>[SPCTATER]:Hello. How is your day?</h3>
              </TypeWriter>
            </div>
           )
         }
       })()}
      {(()=>{
        if(this.state.status == "chat"){
          return <Chat messages={messages} sendMessage={sendMessage} monitor_text={monitor_text}/>
        } else {
          return <Cursor/>
        }
      })()}
      </div>
    )
  }
}

End.propTypes = {
}

export default End
