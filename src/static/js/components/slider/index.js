import './index.css'
import Component from '../../../../utils/component-handler'
import { debounced } from '../../../../utils/event-handler'
import fetchApi from '../../../../utils/fetch'

class Slider extends Component {
  onMount () {
    const $input = document.querySelector('[data-slider-input]')

    $input.addEventListener('change', debounced(300, this.handleSliderChange.bind(this)))
  }

  async handleSliderChange (event) {
    const value = event.target.value

    this.setState({
      period: parseInt(value)
    })

    const result = await fetchApi(this.state)
    const amount = result.gross - result.tax

    this.setState({ ...result, amount })
  }

  render (state) {
    this.state = state
    return `
      <div class="slider" data-slider>
        <div class="slider__fieldset" data-slider-fieldset>
          <label class="slider__label" for="" data-slider-label>For <strong>${this.state.period} months</strong></label>
          <input data-slider-input class="slider__input" type="range" min="${this.state.startPeriodRange}" max="${this.state.endPeriodRange}" value="${this.state.period}" step="${this.state.step}" />
        </div>
      </div>
    `
  }
}

export default new Slider()
