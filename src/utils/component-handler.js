import { publish, subscribe } from './pubsub'

export default class Component {
  constructor () {
    this.mountEvent = subscribe('component:mount', this.onMount.bind(this))
  }

  render () {}

  onMount () {}

  setState (state) {
    this.state = Object.assign(this.state, state)
    publish('state:change', this.state)
  }
}
