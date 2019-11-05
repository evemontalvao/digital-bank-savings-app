const config = {
  development: {
    HOST: 'http://localhost:2107/',
    ENDPOINT: 'savings'
  },
  production: {
    HOST: 'https://tcigd7rv5g.execute-api.us-east-1.amazonaws.com/prod/',
    ENDPOINT: 'savings'
  }
}

module.exports = config[process.env.NODE_ENV]
