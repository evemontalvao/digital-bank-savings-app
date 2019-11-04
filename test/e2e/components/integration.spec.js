/* global describe, beforeEach, cy, it */

beforeEach(() => {
  cy.visit('/')
  cy.wait(1500)
})

describe('NuConta Savings application should', () => {
  it('show results when amount is increased', () => {
    cy.get('[data-increase-control="add"]').trigger('click')

    cy.get('[data-slider-input]')
      .invoke('val', 18)
      .trigger('change')

    cy.get('[data-slider-label]').should('contain', '18 months')
    cy.get('[data-results-period]').should('contain', '18 months')
    cy.get('[data-results-amount]').should('contain', 'R$ 1.185,24')
    cy.get('[data-results-gross]').should('contain', 'R$ 1.203,32')
  })

  it('show results when amount is typed', () => {
    cy.get('[data-increase-input]').clear().type(1100)

    cy.get('[data-slider-input]')
      .invoke('val', 18)
      .trigger('change')

    cy.get('[data-slider-label]').should('contain', '18 months')
    cy.get('[data-results-period]').should('contain', '18 months')
    cy.get('[data-results-amount]').should('contain', 'R$ 1.185,24')
    cy.get('[data-results-gross]').should('contain', 'R$ 1.203,32')
  })

  it('should not accept non-positive values', () => {
    cy.get('[data-increase-input]').clear().type(-100)

    cy.get('[data-increase-input]').should('have.value', 'R$ 100')
  })

  it('should not decrease to non-positive values', () => {
    for (let n = 0; n < 50; n++) {
      cy.get('[data-increase-control="sub"]').click()
    }

    cy.get('[data-increase-input]').should('have.value', 'R$ 0')
  })

  it('should not accept anything but nubers', () => {
    cy.get('[data-increase-input]').clear().type('imnotanumber')

    cy.get('[data-increase-input]').should('have.value', 'R$ 0')
  })
})
