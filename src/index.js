import './static/css/index.css'
import app from './static/js/app'
import { publish, subscribe } from './utils/pubsub'
import initialState from './state'

const renderDOM = (state = {}) => {
  const parent = document.getElementById('app')
  const element = app.render(state)
  parent.innerHTML = element

  publish('component:mount')
}

document.addEventListener('readystatechange', (event) => {
  if (document.readyState !== 'loading') {
    renderDOM(initialState)

    subscribe('state:change', renderDOM.bind(renderDOM, initialState))
  }
})
