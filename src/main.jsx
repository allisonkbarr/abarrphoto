
import 'babel-polyfill'

import { dom, element } from 'deku'
import Application from './components/Application.jsx'
import { createStore, combineReducers } from 'redux'
import reducers from './reducers'
import * as actions from './actions'
import './styles/main.scss'


const reducer = combineReducers(reducers)

const store = createStore(reducer)

const render = dom.createRenderer(document.getElementById('mount'), store.dispatch)

// Rendering function
function update () {
  render(<Application />, { ...store.getState(), actions })
}



// First render
update()

store.subscribe(update)

actions.loadData().then(({ galleryImages, projects }) => {
  store.dispatch({
    type: 'SET_PROJECTS',
    payload: projects
  })
  store.dispatch({
    type: 'SET_GALLERY_IMAGES',
    payload: galleryImages
  })
})
