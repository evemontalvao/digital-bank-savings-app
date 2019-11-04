/* eslint-env jest */

import { subscribe, publish, subscribers } from '../../src/utils/pubsub'

describe('PubSub\'s ', () => {
  describe('subscribe should', () => {
    test('subscribe for given event including it\'s name and callback to subscribers array', () => {
      const callback = jest.fn()
      subscribe('name:event', callback)

      expect(subscribers).toEqual({
        'name:event': [callback]
      })
    })

    test('unsubscribe from given event removing it\'s name and callback from subscribers array', () => {
      const callback = jest.fn()
      const event = subscribe('name:event', callback)

      event.unsubscribe()

      expect(subscribers).toEqual({})
    })
  })

  describe('publish should', () => {
    test('call every callback from subscriber\'s array', () => {
      const fn1 = jest.fn()
      const fn2 = jest.fn()

      subscribe('name:event', fn1)
      subscribe('name:event', fn2)

      publish('name:event')

      expect(fn1).toHaveBeenCalled()
      expect(fn2).toHaveBeenCalled()
    })

    test('return when event does not exist on list', () => {
      expect(publish('name:nonexistent')).toBe(null)
    })
  })
})
