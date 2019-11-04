import './index.css'
import Component from "../../../../utils/component-handler"
import { subscribe } from '../../../../utils/pubsub'
import { throttled } from '../../../../utils/event-handler'
import fetchApi from '../../../../utils/fetch'

export default new class Increaser extends Component {
  constructor() {
    super()
  }

  getControls(ctrl) {
    return `<div class="increase-field__control" data-increase-control="${ctrl}">${this.state.controls[ctrl]}</div>`
  }

  onMount() {
    const $increaseElement = document.querySelector('[data-increase]')
    const $increase = $increaseElement.querySelector('[data-increase-control="add"]')
    const $decrease = $increaseElement.querySelector('[data-increase-control="sub"]')

    $increase.addEventListener('click', throttled(3000, this.handleButtonClick.bind(this)))
    $decrease.addEventListener('click', throttled(3000, this.handleButtonClick.bind(this)))
  }

  async handleButtonClick(event) {
    const type = event.target.attributes['data-increase-control'].value
    const value = this.state['initial-amount']

    const operations = {
      add: value + 100,
      sub: value > 0 ? value - 100 : 0
    }

    this.setState({
      'initial-amount': operations[type],
    })

    const result = await fetchApi(this.state)
    const amount = result.gross - result.tax

    this.setState({ ...result, amount })
  }

  render(state) {
    this.state = state

    return `
      <div class="increase-field" data-increase>
        <div class="increase-field__fieldset">
          <label class="increase-field__label" for="">${this.state.title}</label>
          <div class="increase-field__wrapper">
            <input type="text" value="R$ ${this.state['initial-amount']}" class="increase-field__input">
            <div class="increase-field__controls" data-increase-controls>
            ${Object.keys(this.state.controls).map(this.getControls.bind(this)).join('')}
            </div>
          </div>
        </div>
      </div>
    `
  }
}