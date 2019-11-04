/* global describe, beforeEach, cy, it */

beforeEach(() => {
  cy.visit('/')
  cy.wait(1000)
})

describe('Increaser', () => {
  it('all components elements should be rendered', () => {
    cy.get('[data-increase-label]').should('be.visible')
    cy.get('[data-increase-input]').should('be.visible')
    cy.get('[data-increase-control]').should('be.visible')
  })

  it('increase input value when add button is pressed', () => {
    cy.get('[data-increase-control="add"]').trigger('click')
    cy.get('[data-increase-input]').should('have.value', 'R$ 1.100')
  })

  it('decrease input value when add button is presses', () => {
    cy.get('[data-increase-control="sub"]').trigger('click')
    cy.get('[data-increase-input]').should('have.value', 'R$ 900')
  })

  it('accept and format values at it\'s input', () => {
    cy.get('[data-increase-input]').clear().type(2300)

    cy.get('[data-increase-input]').should('have.value', 'R$ 2.300')
  })
})
