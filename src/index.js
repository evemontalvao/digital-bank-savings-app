import './static/css/index.css'
import app from './static/js/app'
import { publish, subscribe } from './utils/pubsub'
import initialState from './state'
import DOMReady from './utils/dom-ready'

const renderDOM = (state = {}) => {
  const parent = document.getElementById('app')
  const element = app.render(state)
  parent.innerHTML = element

  publish('component:mount')
}

DOMReady(initialState, (state) => {
  renderDOM(state)
  subscribe('state:change', renderDOM)
})
