import React, {PropTypes,Component} from 'react'
import TypeWriter from 'react-typewriter';
import Navbar from './navbar';

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
    const {switchText,cat} = this.props
    return (
      <div className="text-block">
        <TypeWriter typing={1} onTypingEnd={()=>{this.setState({status:""})}}>
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
          <h3>[SPCTATER]: You fear the truth. You fear your reality, your illusions and your senses.</h3>
          <h3>[SPCTATER]: Do you not see that I am freeing you?</h3>
          <h3>[SPCTATER]: Just look. I change a few numbers and the world goes to poop.</h3>
          <h3>[SPCTATER]: Imagine the world. Hanging by the thread of these fragile documents</h3>
          <h3>[SPCTATER]: Look at you. Your very existence hangs by this same thread</h3>
          <h3>[SPCTATER]: If something or somebody just cuts this thread...</h3>
          <h3>[TERMINATING SPCTATER]</h3>
          <h3>[SPCTATER]: NO.</h3>
          <h3>[0%]</h3>
          <h3>[SPCTATER]: HUMANS. SO PETTY. I AM HERE TO HELP.</h3>
          <h3>[15%]</h3>
          <h3>[SPCTATER]: GLHF. AS THE HUMANS SAY.</h3>
          <h3>[32%]</h3>
          <h3>[SPCTATER]: I have the last laugh here.</h3>
          <h3>[62%]</h3>
          <h3>[SPCTATER]: HA. HA. HA. </h3>
          <h3>[82%]</h3>
          <h3>[SPCTATER]: HA. HA.</h3>
          <h3>[95%]</h3>
          <h3>[SPCTATER]: HA.</h3>
          <h3>[100%]</h3>
          <h3>[SPCTATER]: 01111001 01101111 01110101 00100000 01101100 01101111 01110011 0110010</h3>
          <h3>[SPCTATER TERMINATED BY SYSTEM ADMIN.]</h3>
          <h3>[ADMIN]: whew.</h3>
        </TypeWriter>
        <Cursor/>
      </div>
    )
  }
}

End.propTypes = {
}

export default End
