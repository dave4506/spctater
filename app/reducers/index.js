import { combineReducers } from 'redux'
import text from './text'
import cat from './cat'

const App = combineReducers({
  text,
  cat
})

export default App
