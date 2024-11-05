describe(`Assignment Task: Cypress 101 Test scenario 1`, () => {
  it(`Should drag-and-drop the slider 'Default value 15' from 15 to 95`, () => {
    cy.visit('https://www.lambdatest.com/selenium-playground/')
    cy.contains('Drag & Drop Sliders').should('be.visible').click()
    cy.get('#slider3')
      .find('input[type="range"]')
      .should('have.value', '15')
      .then($el => $el[0].stepUp(80))
      .scrollIntoView()
      .trigger('change')
    cy.get('#slider3 #rangeSuccess').should('have.text', '95')
  })
})
