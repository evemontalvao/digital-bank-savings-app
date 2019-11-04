/* global describe, beforeEach, cy, it */

beforeEach(() => {
  cy.visit('/')
  cy.wait(1000)
})

describe('Slider', () => {
  it('all components elements should be rendered', () => {
    cy.get('[data-slider-fieldset]').should('be.visible')
    cy.get('[data-slider]').should('be.visible')
    cy.get('[data-slider-label]').should('be.visible')
    cy.get('[data-slider-input]').should('be.visible')
  })

  it('drag slider forward', () => {
    cy.get('[data-slider-input]')
      .invoke('val', 30)
      .trigger('change')
  })

  it('drag slider backwards', () => {
    cy.get('[data-slider-input]')
      .invoke('val', 6)
      .trigger('change')
  })

  it('drag slider forwards and get correspondent value in label', () => {
    cy.get('[data-slider-input]')
      .invoke('val', 60)
      .trigger('change')

    cy.get('[data-slider-label]')
      .should('contain', '60 months')
  })
})
