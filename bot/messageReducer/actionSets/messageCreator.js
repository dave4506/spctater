class QuickReply {
  constructor(title,payload) {
    this.title = title
    this.payload = JSON.stringify(payload)
  }
  messageify() {
    return {
      "content_type":"text",
      title:this.title,
      payload:this.payload
    }
  }
}

class Message {
  constructor(){
    if (this.messageify === undefined) {
      throw new TypeError("Must override method");
    }
    this.quickReplies = []
  }
  messageify(){
    var primedQr = []
    this.quickReplies.map((q)=>{
      primedQr.push(q.messageify())
    })
    if(this.quickReplies.length < 1)
      return {}
    else
      return {
        quick_replies:primedQr
      }
  }
  addQuickReply(qr){
    this.quickReplies.push(qr);
  }
  addQuickReplies(qrs){
    this.quickReplies.concat(qrs);
  }
}

class TextMessage extends Message {
  constructor(text){
    super()
    this.text = text;
  }
  messageify(){
    return Object.assign({},super.messageify(),{text:this.text})
  }
  changeText(text){
    return new TextMessage(text);
  }
}

class MediaMessage extends Message {
  constructor(type,url){
    super()
    this.type = type;
    this.url = url;
  }
  messageify(){
    return Object.assign({},super.messageify(),{
      attachment:{
        "type":this.type,
        payload:{
          url:this.url
        }
      }
    })
  }
}

class ImageMessage extends MediaMessage {
  constructor(url){
    super("image",url)
  }
  changeUrl(url){
    return new ImageMessage(url);
  }
}

class AudioMessage extends MediaMessage {
  constructor(url){
    super("audio",url)
  }
  changeUrl(url){
    return new AudioMessage(url);
  }
}

class VideoMessage extends MediaMessage {
  constructor(url){
    super("video",url)
  }
  changeUrl(url){
    return new VideoMessage(url);
  }
}

class FileMessage extends MediaMessage {
  constructor(url){
    super("file",url)
  }
  changeUrl(url){
    return new FileMessage(url);
  }
}

class ButtonMessage extends Message {
  constructor(text,buttons){
    super();
    this.text = text;
    this.buttons = buttons || [];
  }
  addButton(button){
    return new ButtonMessage(this.text,this.buttons.push(button))
  }
  addButtons(buttons){
    return new ButtonMessage(this.text,this.buttons.concat(buttons))
  }
  changeText(text){
    return new ButtonMessage(text,this.buttons)
  }
  messageify(){
    var primedButtons = []
    this.buttons.map((b)=>{
      primedButtons.push(b.messageify());
    })
    return Object.assign({},super.messageify(),{
      attachment:{
        "type":"template",
        "payload":{
          "template_type":"button",
          text:this.text,
          "buttons":primedButtons
        }
      }
    })
  }
}

class GenericMessage extends Message {
  constructor(elements){
    super();
    this.elements = elements
  }
  messageify(){
    var primedElements = []
    this.elements.map((e)=>{
      primedElements.push(e.messageify())
    })
    return Object.assign({},super.messageify(),{
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":primedElements
        }
      }
    })
  }
  addElement(element){
    return new GenericMessage(this.elements.push(element))
  }
  addElements(elements){
    return new GenericMessage(this.elements.concat(elements))
  }
}

class Element {
  constructor(title,image_url,subtitle,buttons){
    this.title = title,
    this.image_url = image_url,
    this.subtitle = subtitle,
    this.buttons = buttons
  }
  addButton(button){
    return new Element(this.title,this.image_url,this.subtitle,this.buttons.push(button))
  }
  addButtons(buttons){
    return new Element(this.title,this.image_url,this.subtitle,this.buttons.concat(buttons))
  }

  messageify() {
    const {title,imageUrl,subtitle,buttons} = this;
    return {title,imageUrl,subtitle,buttons}
  }
}

class Button {
  constructor(type,title){
    this.type = type, this.title = title;
  }
  messageify(){
    return {
      "type":this.type,
      title:this.title
    }
  }
}

class PostBackButton extends Button {
  constructor(title,payload){
    super("postback",title);
    this.payload = JSON.stringify(payload);
  }
  messageify(){
    var button = super.messageify();
    button.payload = this.payload;
    return button;
  }
}

class WebUrlButton extends Button {
  constructor(title,url){
    super("web_url",title);
    this.url = url;
  }
  messageify(){
    var button = super.messageify();
    button.url = this.url;
    return button;
  }
}

export default {
  TextMessage,
  ImageMessage,
  FileMessage,
  AudioMessage,
  VideoMessage,
  ButtonMessage,
  GenericMessage,
  Element,
  PostBackButton,
  WebUrlButton,
  QuickReply
}
