import firebase from 'firebase'

export const updateText = (textCat,generation) => {
  return {
    type:"UPDATE_TEXT",
    textCat,
    generation
  }
}

const fetchCatStatus = (status,data) => {
  return {
    type:"FETCH_CAT",
    status,
    data
  }
}

export const fetchCategory = () => {
  return (dispatch) => {
    dispatch(fetchCatStatus("REQUEST"))
    firebase.database().ref('textMeta').once('value').then((snapshot)=>{
      const data = snapshot.val();
      dispatch(fetchCatStatus("RECIEVED",data));
    })
  }
}

export const selectedCategory = (k) => {
  return {
    type:"SELECTED_CAT",
    key:k
  }
}

const fetchTextStatus = (status,text,analytics) => {
  return {
    type:"FETCH_TEXT_CAT",
    status,
    text,
    analytics,
  }
}

export const fetchText = (category) => {
  return (dispatch) => {
    dispatch(fetchTextStatus("REQUEST"))
    firebase.database().ref('text').child(category).limitToLast(20).once('value').then((snapshot)=>{
      const texts = snapshot.val();
      firebase.database().ref('analysis').child(category).limitToLast(20).once('value').then((snapshot2)=>{
        const a = snapshot2.val();
        dispatch(fetchTextStatus("RECIEVED",texts,a));
      })
    })
  }
}
