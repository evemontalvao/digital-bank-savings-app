import './index.css'
import Component from "../../../../utils/component-handler"
import './index.css'
import { subscribe } from '../../../../utils/pubsub'
import { debounced } from '../../../../utils/event-handler'
import fetchApi from '../../../../utils/fetch'

export default new class Slider extends Component {
  constructor() {
    super()
  }

  onMount() {
    const $slider = document.querySelector('.slider')
    const $input = document.querySelector('.slider__input')

    $input.addEventListener('input', debounced(300, this.handleSliderChange.bind(this)))
  }

  async handleSliderChange(event) {
    const value = event.target.value

    this.setState({
      period: parseInt(value)
    })

    const result = await fetchApi(this.state)
    const amount = result.gross - result.tax

    this.setState({ ...result, amount })
  }

  render(state) {
    this.state = state
    return `
      <div class="slider">
        <div class="slider__fieldset">
          <label class="slider__label" for="">For <strong>${this.state.period} months</strong></label>
          <input class="slider__input" type="range" min="${this.state.startPeriodRange}" max="${this.state.endPeriodRange}" value="${this.state.period}" step="${this.state.step}" />
        </div>
      </div>
    `
  }
}