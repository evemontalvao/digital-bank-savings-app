import './index.css'
import Component from "../../../../utils/component-handler"
import { subscribe } from '../../../../utils/pubsub'

export default new class Result extends Component {
  constructor() {
    super()
  }

  convertToString(value) {
    return value.toLocaleString('pt-BR')
  }

  render(state) {
    this.state = state

    return `
    <div class="results__card">
      <div class="results__icon"><img src="static/images/relaxing.png" alt=""></div>
      <div class="results__label">in ${this.state.period} months</div>
      <div class="results__amount">R$ ${this.convertToString(this.state.amount)}</div>
      <div class="results__label">(valor bruto R$ ${this.convertToString(this.state.gross)})</div>
      <div class="results__label results__text">This estimate does not constitute a guarantee of future earning. It is only an estimate based on today's Interbank Deposit rate for the entire period that your deposit would remain in your NuConta account, and considering no withdrawals.</div>
    </div>
    `.trim()
  }
}