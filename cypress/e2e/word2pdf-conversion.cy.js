import { elements } from "../fixtures/constants.js";
const { url, linksTitles, titleHome, word2pdfTitle, downloadTitle, downloadPageHeader, downloadBnt, pdfPath } = elements
describe(`Should visit ${url} , and check the word to pdf conversion functionality`, () => {
  beforeEach(() => {
    cy.visit('/');
  })
  it(`should open ${url} and check the home page title`, () => {
    cy.get('#okck')
    .click()
    cy.get('Title')
    .should('contain', titleHome)
    cy.percySnapshot();
  })
  it('should check the home page tools blocks text and href attributes', () => {
    cy.get('.tools__container > div > a')
    .as('list')
    .each($el => {
      expect($el).to.have.attr('href')
      cy.wrap($el)
      .invoke('attr', 'href')
      .then(href => {
      cy.request(href)
      .its('status')
      .should('eq', 200);
      })
    })
    cy.get('h3')
    .as('container')
    .should('have.length', 23)
    .then(($els) => {
      return (
        Cypress.$.makeArray($els)
          .map((el) => el.innerText)
      )
    })
    .should('be.an', 'array')
    .then(arr => {
      for(let i = 0; i < arr.length; i++) {
        expect(arr[i]).to.eq(linksTitles[i])
      }
      }) 
  })
  it('should check upload of prepaired word docx file to the "Word to PDF" page', () => {
    cy.contains('Word to PDF')
    .click()
    cy.get('title')
    .should('have.text', word2pdfTitle)
    cy.get('input[type="file"]')
    .as('uploadBtn')
    .should('have.css', 'opacity')
    .should('include', '0')
    cy.get('@uploadBtn')
    .selectFile('cypress/fixtures/example.docx', { force: true })
    cy.get('.file__info > span')
    .should('have.text', 'example.docx')
    cy.get('#processTask')
    .should('have.css', 'font-size')
    .should('include', '24px')
  })
  it('should check the uploaded word file is converted to pdf and check the downloaded pdf file has the same text', () => {
    cy.contains('Word to PDF')
    .click()
    cy.get('input[type="file"]', {timeout: 7000})
    .selectFile('cypress/fixtures/example.docx', { force: true })
    cy.get('#processTask', {timeout: 7000})
    .click()
    cy.get('title', {timeout: 7000})
    .and('have.text', downloadTitle)
    cy.get('.title2')
    .should('include.text', downloadPageHeader)
    cy.screenshot()
    cy.get('#pickfiles', {timeout: 7000})
    .as('downloadBtn')
    .should('have.attr', 'href')
    cy.get('@downloadBtn')
    .should('contain.text', downloadBnt)
    cy.readFile(pdfPath, 'ASCII')
    .should('exist')
    cy.task('data', pdfPath)
    .should('contain', 'Test text for pdf convertion')
  })
})