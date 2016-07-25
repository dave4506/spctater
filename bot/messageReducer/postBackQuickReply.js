import defaulter from './actionSets/default/index'
import processPostback from './postBack'

const processQRMessage = (message,userState) => {
  if(message.quick_reply.payload.indexOf("UNPOSTBACK")==-1)
    return processPostback({payload:message.quick_reply.payload},userState)
  else
    return defaulter(userState,"POSTBACK");
}

export default processQRMessage
