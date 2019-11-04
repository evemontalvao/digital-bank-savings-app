const fetchSavings = async (state) => {
  const data = {
    'initial-amount': state['initial-amount'],
    interest: state.interest,
    period: state.period
  }
  console.log('TCL: fetchSavings -> data', data);

  const options = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data)
  }


  const result = await fetch('http://localhost:2107/savings', options)
  return result.json()
}

export default fetchSavings