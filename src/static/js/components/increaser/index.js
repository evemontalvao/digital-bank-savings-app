import './index.css'
import Component from '../../../../utils/component-handler'
import { throttled, debounced } from '../../../../utils/event-handler'
import fetchApi from '../../../../utils/fetch'

class Increaser extends Component {
  getControls (ctrl) {
    return `<div class="increase-field__control" data-increase-control="${ctrl}">${this.state.controls[ctrl]}</div>`
  }

  onMount () {
    const $increaseElement = document.querySelector('[data-increase]')
    const $increase = $increaseElement.querySelector('[data-increase-control="add"]')
    const $decrease = $increaseElement.querySelector('[data-increase-control="sub"]')
    const $input = $increaseElement.querySelector('[data-increase-input]')

    $input.addEventListener('keydown', debounced(500, (event) => this.fetchAndSetState(event.target.value)))
    $input.addEventListener('keyup', this.applyPattern.bind(this))
    $increase.addEventListener('click', throttled(500, this.handleButtonClick.bind(this)))
    $decrease.addEventListener('click', throttled(500, this.handleButtonClick.bind(this)))
  }

  formatValue (value) {
    return value.toLocaleString('pt-BR')
  }

  applyPattern (event) {
    const value = event.target.value
    event.target.value = `R$ ${value.replace(/[\D]/gm, '')}`
  }

  parseValue (value) {
    const newValue = value.replace(/[\W|\D]/gm, '')

    return newValue.length ? parseInt(newValue) : 0
  }

  async fetchAndSetState (value = 0) {
    const parsedValue = typeof value === 'number' ? value : this.parseValue(value)

    this.setState({
      'initial-amount': parsedValue,
      'view-amount': this.formatValue(parsedValue)
    })

    const result = await fetchApi(this.state)
    const amount = result.gross - result.tax

    this.setState({ ...result, amount })
  }

  handleButtonClick (event) {
    const type = event.target.attributes['data-increase-control'].value
    const value = this.state['initial-amount']

    const operations = {
      add: value + 100,
      sub: value > 0 ? value - 100 : 0
    }

    this.fetchAndSetState(operations[type])
  }

  render (state) {
    this.state = state

    return `
      <div class="increase-field" data-increase>
        <div class="increase-field__fieldset">
          <label class="increase-field__label" data-increase-label>${this.state.title}</label>
          <div class="increase-field__wrapper">
            <input type="text" value="R$ ${this.state['view-amount']}" class="increase-field__input" data-increase-input>
            <div class="increase-field__controls" data-increase-controls>
            ${Object.keys(this.state.controls).map(this.getControls.bind(this)).join('')}
            </div>
          </div>
        </div>
      </div>
    `
  }
}

export default new Increaser()
