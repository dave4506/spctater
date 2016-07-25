import firebase from 'firebase'

firebase.initializeApp({
  databaseURL:"https://storyful-2643a.firebaseio.com/",
  serviceAccount:"./serviceAccountCredentials.json"
})

class FirebaseAdapter {
  constructor() {
    // NOTE: must you the index of the object be the root of the file path
    this.ref = firebase.database().ref("userState")
    this.storyRef = firebase.database().ref("story")
  }

  getUserState(uid){
    const userRef = this.ref.child(uid);
    return userRef.once("value").then((data)=>{
      return data.val()
    })
  }

  updateUserState(uid,newState,payload){
    const userRef = this.ref.child(uid);
    return userRef.update({
      state:newState,
      payload:payload
    }).then(()=>{
      return {newState,payload,uid,status:"updated"}
    })
  }

  generateStoryKey(){
    return this.storyRef.push().key;
  }

  createStory(uid,storyKey){
    var updates = {}
    updates['/userState/'+uid+"/state"]="CREATE_STORY";
    updates['/userState/'+uid+"/payload"]={key:storyKey};
    updates['/userStories/'+uid+"/"+storyKey] = true;
    updates['/story/'+storyKey] = {author:uid,article:[],title:"",imageUrl:""}
    return firebase.database().ref().update(updates).then(()=>{
      return {status:"success"}
    })
  }

  getStory(key){
    return this.storyRef.child(key).once("value").then((data)=>{return data.val()})
  }
}

export default new FirebaseAdapter()
