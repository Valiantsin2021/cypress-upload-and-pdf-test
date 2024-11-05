let chance = require('chance')

describe('Test Scenario 2', () => {

  it('Navigate to the Form', () => {
    cy.visit('https://www.lambdatest.com/selenium-playground/')
    cy.injectAxe()
    cy.checkA11y('.sp__main > div')
    cy.viewport('samsung-note9')
    cy.title().should('contain', 'Selenium Grid Online')
    cy.get('.st_heading:first')
      .should('be.visible')
      .should('have.text', ' Input Forms')
    cy.contains('Input Form Submit').should('be.visible').click()
    cy.get('#seleniumform').scrollIntoView()
  })

  it('Enter form details', function () {
    cy.visit('https://www.lambdatest.com/selenium-playground/')
    cy.injectAxe()
    cy.checkA11y('.sp__main > div')
    cy.viewport('samsung-note9')
    let username = chance().name()
    let email = chance().email()
    let password = chance().string()
    let company = chance().company()
    let zipCode = chance().zip()
    let address = chance().address({ short_suffix: true })
    let address2 = chance().address()
    let state = chance().state()
    let website = chance().avatar({ protocol: 'https' })
    let city = chance().city()

    cy.get('#seleniumform').within(() => {
      cy.get('input#name').type(username)
      cy.get('input#inputEmail4').type(email)
      cy.get('input#inputPassword4').type(password)
      cy.get('input#company').type(company)
      cy.get('input#websitename').type(website)
      cy.get('select').select('India').should('have.value', 'IN')
      cy.get('input#inputCity').type(city)
      cy.get('input#inputAddress1').type(address)
      cy.get('input#inputAddress2').type(address2)
      cy.get('input#inputState').type(state)
      cy.get('input#inputZip').type(zipCode)
      cy.get('button').click()
    })

    cy.fixture('config.json').then(configuration => {
      cy.lighthouse(configuration.threshold, configuration.lighthouseConfig)
    })

    cy.get('.success-msg').should(
      'have.text',
      'Thanks for contacting us, we will get back to you shortly.'
    )
    cy.go('back')
  })

  Cypress.session.clearAllSavedSessions()
})
