/* eslint-env jest */

import Component from '../../src/utils/component-handler'
import { subscribe, publish } from '../../src/utils/pubsub'

jest.mock('../../src/utils/pubsub', () => {
  return {
    subscribe: jest.fn(() => ({})),
    publish: jest.fn(() => {})
  }
})

describe('Component', () => {
  describe('constructor should', () => {
    test('subscribe for component:mount event', () => {
      const component = new Component()

      expect(component.mountEvent).toBeDefined()
    })
  })

  describe('render should', () => {
    test('be defined', () => {
      const component = new Component()

      expect(component.render).toBeDefined()
    })
  })

  describe('onMount should', () => {
    test('be defined', () => {
      const component = new Component()

      expect(component.onMount).toBeDefined()
    })
  })

  describe('setState should', () => {
    test('assign this.state with received state', () => {
      const component = new Component()
      const newState = { state: 'state' }
      component.state = {}

      component.setState(newState)
      jest.spyOn(Object, 'assign')

      expect(component.state).toEqual(newState)
    })

    test('publish state:change event passing the new state to the subscribers', () => {
      const component = new Component()
      component.state = {}

      component.setState({ state: 'state' })

      expect(publish).toHaveBeenCalledWith('state:change', { state: 'state' })
    })
  })
})
