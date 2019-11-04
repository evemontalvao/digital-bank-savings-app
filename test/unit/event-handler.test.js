/* eslint-env jest */
/* global Event */

import { debounced, throttled } from '../../src/utils/event-handler'

describe('debounced fn should call function only once for each 500 miliseconds', () => {
  test('', () => {
    jest.useFakeTimers()

    const callback = jest.fn()

    document.addEventListener('click', debounced(500, callback))
    document.dispatchEvent(new Event('click'))
    document.dispatchEvent(new Event('click'))
    document.dispatchEvent(new Event('click'))

    expect(callback).not.toHaveBeenCalled()
    jest.advanceTimersByTime(600)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})

describe('throttled fn should', () => {
  test('only call function again after 500 miliseconds', () => {
    Date.now = jest.fn(() => 1482363367071)

    const callback = jest.fn(() => {})

    document.addEventListener('click', throttled(500, callback))
    document.dispatchEvent(new Event('click'))
    expect(callback).toHaveBeenCalledTimes(0)

    Date.now = jest.fn(() => 1482363367572)

    document.dispatchEvent(new Event('click'))
    document.dispatchEvent(new Event('click'))
    document.dispatchEvent(new Event('click'))

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
