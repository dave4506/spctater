export default function text(state = {}, action) {
  switch (action.type) {
    case "FETCH_CAT":
      return Object.assign({},{status:action.status},action.data);
    default:
      return state;
  }
}
