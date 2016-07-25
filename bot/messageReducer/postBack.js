import defaulter from './actionSets/default/index'

const postBack = ({payload},userState) => {
  const action = JSON.parse(payload);
  switch (action.set) {
    default:
      return defaulter("POSTBACK","DEFAULT",userState);
  }
}

export default postBack
