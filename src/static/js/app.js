import '../css/index.css'
import Increaser from './components/increaser'
import Slider from './components/slider'
import Result from './components/result'

class App {
  render (state) {
    return `
      <section class="column">
        ${Increaser.render(state)}
        ${Slider.render(state)}
      </section>
      <section class="column">
        ${Result.render(state)}
      </section>
    `
  }
}

export default new App()
