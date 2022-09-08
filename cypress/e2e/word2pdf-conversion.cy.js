import { elements } from "../fixtures/constants.js";

describe('Should visit https://www.ilovepdf.com/ , and check the word to pdf conversion', () => {
  beforeEach(() => {
    cy.visit('https://www.ilovepdf.com/');
  })
  it('should open https://www.ilovepdf.com/ and check the title', () => {
    cy.get('#okck')
    .click()
    cy.get('Title')
    .should('contain', 'iLovePDF | Online PDF tools for PDF lovers')
  })
  it('should check the pdf tools links text and href attributes on the main page', () => {
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
        expect(arr[i]).to.eq(elements[i])
      }
      }) 
  })
  it('should upload word file to the website', () => {
    cy.contains('Word to PDF')
    .click()
    cy.get('title')
    .should('have.text', 'Convert Word to PDF. Documents DOC to PDF')
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
  it('should convert uploaded file to pdf and check the downloaded pdf file has been downloaded', () => {
    cy.contains('Word to PDF')
    .click()
    cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/example.docx', { force: true })
    cy.get('#processTask')
    .click()
    cy.get('title', {timeout: 7000})
    .and('have.text', 'Download file | iLovePDF back')
    cy.get('.title2')
    .should('include.text', 'WORD file has been converted to PDF')
    cy.get('#pickfiles')
    .as('downloadBtn')
    .should('have.attr', 'href')
    cy.get('@downloadBtn')
    .should('contain.text', 'Download PDF')
    cy.readFile('cypress/downloads/example.pdf', 'ASCII')
    .should('exist')
  })
})