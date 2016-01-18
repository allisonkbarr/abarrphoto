import {dom, element} from 'deku'
import Application from './components/Application.jsx'
import { createStore } from 'redux'
var x = require('deku')

const reducer = (state = { number: 0 }, action) => {
  switch (action.type) {
    case 'UP':
      return Object.assign(state, { number: state.number+1 })
    case 'DOWN':
      return Object.assign(state, { number: state.number-1 })
    default:
      return state
  }
}

const store = createStore(reducer)

const render = dom.createRenderer(document.getElementById('mount'), store.dispatch)

// Rendering function
function update () {
  render(<Application />, store.getState())
}

// First render
update()

store.subscribe(update)
