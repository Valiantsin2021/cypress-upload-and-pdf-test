describe(
  'Various tests on "https://qaboxletstestcypresspracticesite.netlify.app/fileupload.html"',
  {
    baseUrl: 'https://qaboxletstestcypresspracticesite.netlify.app/'
  },
  () => {
    beforeEach(() => {
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
    })
    it('test different types of upload a file', () => {
      cy.visit('/fileupload.html')
      cy.get('#file-upload1').selectFile('cypress/fixtures/QR.png')
      cy.contains('Add Shadow DOM').click()
      // search shadow el via the shadow host
      cy.get('#shadowHost').shadow().find('#file-upload2').selectFile({
        contents: 'cypress/fixtures/QR.png',
        fileName: 'file.png'
      })
      // direct search the element shadow
      //   cy.get('#file-upload2', { includeShadowDom: true })
      //     .eq(0)
      //     .selectFile({
      //       contents: 'cypress/fixtures/QR.png',
      //       fileName: 'file.png'
      //     })
      cy.get('#file-upload2').selectFile([
        'cypress/fixtures/example.docx',
        'cypress/fixtures/QR.png'
      ])
      cy.get('#holder').selectFile('cypress/fixtures/QR.png', {
        action: 'drag-drop'
      })
    })
    it('test different types of selects', () => {
      cy.visit('/differentdropdowntypes')
      cy.get('#speed').select('Medium').should('have.value', 3)
      cy.get('#files').select('Some unknown file')
      cy.contains('#selectFiles', 'Some unknown file')
      cy.get('#myInput').type('Spain')
      cy.get('.autocomplete-items strong').should('have.text', 'Spain')
      cy.get('#cselect')
        .select(['Russia', 'Angola'])
        .find('option:selected')
        .invoke('text')
        .should('deep.equal', ['Russia', 'Angola'].join(''))
      cy.get('#cselect option:selected').each(el => {
        expect(el).to.have.css('background-color').and.eq('rgb(30, 144, 255)')
      })
      cy.get('.chosen-search-input').click()
      cy.contains('li', 'Angola').should('be.visible').click()
      cy.get('li.search-choice span')
        .should('have.text', 'Angola')
        .and('be.visible')
    })
    it('test drag-and-drops', () => {
      const dataTr = new DataTransfer() //can work without it
      cy.visit('/dragndrop.html')
      cy.get('div.fill').should('have.attr', 'draggable', 'true')
      //native
      cy.get('div.fill').trigger('dragstart', { dataTr })
      cy.get('div.empty:nth-of-type(3)').trigger('drop', { dataTr })
      cy.get('div.fill').trigger('dragend')
      //with plugin
      cy.get('div.fill').drag('div.empty:nth-of-type(2)')
      cy.get('#divTwo').drag('#divOne')
      cy.get('#divTwo2').drag('#divOne1')
      cy.get('#drag').drag('#drop', { force: true })
    })
    it('Test mouse events', () => {
      cy.visit('/mouseevents.html')
      cy.get('#click').click()
      // cy.on('window:alert', (alert) => {
      //   expect(alert).to.equal('click event is fired')
      // })
      cy.get('#dblclick').dblclick()
      // cy.on('window:alert', (alert) => {
      //   expect(alert).to.equal('dblclick event is fired')
      //   return true
      // })
      cy.get('#rightclick').rightclick()
      cy.get('#msover').trigger('mouseover')
      cy.get('#show').should('be.visible')
      cy.get('#msover').trigger('mouseout')
      cy.get('#show').should('not.be.visible')
      cy.get('#box2').rightclick()
      cy.get('.site-cm-group li')
        .invoke('text')
        .should('equal', 'One AppleTwo OrangesThree Bananas')
    })
    it('test sliders', () => {
      cy.visit('/slider.html')
      cy.get('#rangeone').invoke('val', '80').trigger('change')
      cy.get('#rangetwo').invoke('val', '80').trigger('change')
    })
    it.only('test sliders', () => {
      cy.visit('/styledslider.html')
      cy.get('#slide-2').click({ force: true })
      cy.get('#slide-3').click({ force: true })
      cy.get('#slide-4').click({ force: true })
    })
  }
)
