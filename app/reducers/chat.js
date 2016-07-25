export default function text(state = {messages:[],key:""}, action) {
  switch (action.type) {
    case "NEW_KEY":
      return Object.assign({},state,{key:action.key});
    case "NEW_MESSAGE":
      console.log(action.message)
      const msg = [].concat(state.messages).concat([action.message]);
      console.log(msg)
      return Object.assign({},state,{messages:msg});
    default:
      return state;
  }
}
