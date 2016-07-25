import { combineReducers } from 'redux'
import text from './text'
import cat from './cat'
import chat from './chat'

const App = combineReducers({
  text,
  cat,
  chat
})

export default App
