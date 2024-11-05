describe(`test download and upload files`, () => {
  it('test file download', () => {
    cy.visit(
      'https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo'
    )
    cy.get('button#create').as('create').should('be.disabled')
    cy.get('textarea#textbox').type('hello from cypress')
    cy.get('@create').should('be.enabled').click()
    cy.get('a#link-to-download').click()
    cy.readFile('cypress\\downloads\\Lambdainfo.txt').then(data => {
      cy.log(data)
    })
  })
  it('test file upload', () => {})
})
