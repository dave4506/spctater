import defaulter from './actionSets/default/index'
import firebase from 'firebase'
const processMessage = (message,userState) => {
  const userStateSet = userState.substr(0,userState.indexOf('_'));
  const userStateProgress = userState.substr(userState.indexOf('_')+1);
  return firebase.database().ref('chat/' + "test_key").push({from:"spctater",message:message.text}).then(()=>{
    return {userState}
  })
}

export default processMessage
