/* eslint-env jest */

import DOMReady from '../../src/utils/dom-ready'

describe('DOMReady should', () => {
  test('call callback when document.readyState is different than loading', () => {
    global.document = {
      readyState: 'interactive'
    }

    const callback = jest.fn(() => true)

    expect(DOMReady({}, callback)).toBeTruthy()
    expect(callback).toHaveBeenCalledWith({})
  })

  test('add event listener to document when document.readyState is loading', () => {
    Object.defineProperty(global.document, 'readyState', { value: 'loading' })

    const callback = jest.fn()

    jest.spyOn(document, 'addEventListener')

    expect(DOMReady({}, callback)).toBeUndefined()

    expect(document.addEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function))
  })
})
