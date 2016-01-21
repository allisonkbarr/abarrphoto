import { dom, element } from 'deku'
import Application from './components/Application.jsx'
import { createStore, combineReducers } from 'redux'
import reducers from './reducers'
import './src/styles/main.scss'


const reducer = combineReducers(reducers)

const store = createStore(reducer)

const render = dom.createRenderer(document.getElementById('mount'), store.dispatch)

// Rendering function
function update () {
  render(<Application />, store.getState())
}

// First render
update()

store.subscribe(update)
