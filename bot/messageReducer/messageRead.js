import defaulter from './actionSets/default/index'

const processMessageRead = (message,userState) => {
  const userStateSet = userState.substr(0,userState.indexOf('_'));
  const userStateProgress = userState.substr(userState.indexOf('_')+1);
  switch(userStateSet) {
    default: return defaulter("MESSAGE_READ","",userState);
  }
}

export default processMessageRead
