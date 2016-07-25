import MessageCreator from '../messageCreator'
const {TextMessage} = MessageCreator;

const defaultAction = (msgType,msg,userState) => {
  return {
    userState,
    message: new TextMessage("Sorry! TouchID was too fast! Didn't catch your notification.")
  }
}

export default defaultAction
