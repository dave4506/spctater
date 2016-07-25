import message from './message'
import postBack from './postBack'
import postBackQuickReply from './postBackQuickReply'
import attachmentMessage from './attachmentMessage'
import textPostback from './textPostback'
import messageRead from './messageRead'

export default {
  processPostBack:postBack,
  processPostBackQuickReply:postBack,
  processMessage:message,
  processAtchMessage:attachmentMessage,
  processTextPostback:textPostback,
  processMessageRead:messageRead
}
