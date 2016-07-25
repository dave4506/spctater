import firebase from 'firebase'

const new_message = (message)=>{
  return {
    type:"NEW_MESSAGE",
    message
  }
}

export const type_message = (message)=>{
  return (dispatch,getState) => {
    const state = getState();
    const key = state.chat.key;
    if(key != "") {
      firebase.database().ref('chat/' + key).push({from:"client",message}).then(()=>{
      })
    } else {
    }
  }
}

const new_key = (key)=> {
  return {
    type:"NEW_KEY",
    key:"test_key"
  }
}

export const monitor_text = ()=>{
  return dispatch => {
    var newPostKey = firebase.database().ref().child('chats').push().key;
    dispatch(new_key(newPostKey))
    firebase.database().ref('chat/' + "test_key").on('child_added', (snapshot) => {
      dispatch(new_message(snapshot.val()));
    });
  }
}
