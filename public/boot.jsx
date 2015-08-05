
import React from 'react'
import Governor from 'governorjs'
import Router from 'grapnel'

import Root from 'components/root.jsx!'

import projectStore from 'stores/project'
import viewStore from 'stores/view'

var screen = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight
}

var rootEl = document.getElementById('root')

var stateManager = Governor.create({
  projects: projectStore,
  _view: viewStore
}, function(state, hub) {
  window.appState = state
  React.render(<Root {...state} hub={hub} />, rootEl)
})

stateManager.hub.set({ $set: { screen: screen } })

var router = new Router()

router.get('/', function() {
  stateManager.hub.emit('selectPane', 'home')
})

router.get('/about', function() {
  stateManager.hub.emit('selectPane', 'about')
})

router.get('/gallery', function() {
  stateManager.hub.set({ galleryThumbIndex: { $set: null } })
  stateManager.hub.emit('selectPane', 'gallery')
})

router.get('/gallery/:thumbIndex', function(ctx) {
  stateManager.hub.set({ galleryThumbIndex: { $set: ctx.params.thumbIndex } })
  stateManager.hub.emit('selectPane', 'gallery')
})

router.get('/projects/:slug', function(ctx) {
  stateManager.hub.emit('selectProjectBySlug', ctx.params.slug)
  stateManager.hub.emit('selectPane', 'project')
})

router.get('/projects/:slug/gallery/:thumbIndex', function(ctx) {
  stateManager.hub.emit('selectThumbByIndex', ctx.params.slug, ctx.params.thumbIndex)
  stateManager.hub.emit('selectPane', 'project')
})
