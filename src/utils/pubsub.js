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
  if (!subscribers[event]) return;

  subscribers[event].forEach(callback => callback(data))
}

module.exports = {
  subscribers,
  publish,
  subscribe
}
