/* global fetch */
import config from '../../config/index'

const fetchSavings = async (state) => {
  const data = {
    'initial-amount': state['initial-amount'],
    interest: state.interest,
    period: state.period
  }

  const options = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data)
  }

  const result = await fetch(`${config.HOST}${config.ENDPOINT}`, options)
  return result.json()
}

export default fetchSavings
