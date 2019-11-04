function debounced (delay, fn) {
  let timerId

  return function (...args) {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      fn(...args)
      timerId = null
    }, delay)
  }
}

function throttled (wait, fn) {
  let time = Date.now()
  return function (...args) {
    if ((time + wait - Date.now()) < 0) {
      fn(...args)
      time = Date.now()
    }
  }
}

export {
  throttled,
  debounced
}
