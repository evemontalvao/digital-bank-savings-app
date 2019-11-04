import increaser from './components/increaser'
import slider from './components/slider'
import result from './components/result'

export default new class App {
  render(state) {
    return `
      <section class="column">
        ${increaser.render(state)}
        ${slider.render(state)}
      </section>
      <section class="column">
        ${result.render(state)}
      </section>
    `
  }
}