import defaulter from './actionSets/default/index'

const processAttachmentMessage = (message,userState) => {
  const userStateSet = userState.substr(0,userState.indexOf('_'));
  const userStateProgress = userState.substr(userState.indexOf('_')+1);
  switch(userStateSet) {
    default: return defaulter("ATTACHMENT_MESSAGE","",userState);
  }
}

export default processAttachmentMessage
