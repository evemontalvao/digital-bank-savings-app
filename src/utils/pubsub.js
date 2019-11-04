const subscribers = {}

const subscribe = (event, callback) => {
  if (!subscribers[event]) {
    subscribers[event] = []
  }

  subscribers[event].push(callback)
  return {
    unsubscribe: () => {
      delete subscribers[event]
    }
  }
}

const publish = (event, data) => {
  if (!subscribers[event]) return null

  subscribers[event].forEach(callback => callback(data))
}

export {
  subscribe,
  publish,
  subscribers
}
