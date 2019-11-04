import './index.css'
import Component from '../../../../utils/component-handler'

class Result extends Component {
  convertToString (value) {
    return value.toLocaleString('pt-BR')
  }

  render (state) {
    this.state = state

    return `
    <div class="results__card" data-results>
      <div class="results__icon"><img src="static/images/relaxing.png" alt=""></div>
      <div class="results__label" data-results-period>in ${this.state.period} months you would have</div>
      <div class="results__amount" data-results-amount>R$ ${this.convertToString(this.state.amount)}</div>
      <div class="results__label" data-results-gross>(gross amount R$ ${this.convertToString(this.state.gross)})</div>
      <div class="results__label results__text">This estimate does not constitute a guarantee of future earning. It is only an estimate based on today's Interbank Deposit rate for the entire period that your deposit would remain in your NuConta account, and considering no withdrawals.</div>
    </div>
    `
  }
}

export default new Result()
