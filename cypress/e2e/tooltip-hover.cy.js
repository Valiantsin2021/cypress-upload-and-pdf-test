it('get tooltip text', {scrollBehavior: 'center'}, () => {
  cy.visit('https://plausible.io/plausible.io')
  cy.contains('Visit duration').trigger('mouseover')
  cy.get('.z-50 > div:nth-child(1) > div.whitespace-nowrap')
    .invoke('text')
    .then(cy.log)
})
