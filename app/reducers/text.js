
export default function text(state = {}, action) {
  switch (action.type) {
    case "SELECTED_CAT":
      return Object.assign({},state,{selected:action.key,texts:[],analytics:[]})
    case "FETCH_TEXT_CAT":
      if(action.status == "RECIEVED")
        return Object.assign({},state,{status:"RECIEVED", texts:action.text,analytics:action.analytics})
      else
        return Object.assign({},state,{status:"NOT_RECIEVED"})
    default:
      return state;
  }
}
