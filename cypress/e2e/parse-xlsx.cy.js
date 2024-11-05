it('parse xlsx', () => {
  cy.parseXlsx('cypress/fixtures/Test-case-template.xls').then(jsonData => {
    // finally we write the assertion rule to check
    // if that data matches the data we expected the excel file to have
    // ******************* NOTE: *********************
    // data[1] is the ROW that contains the data to be matched using the
    // const above
    cy.log(jsonData)
    let data = jsonData[0].data.flat().filter(el => el)
    // let data = jsonData[0].data.filter(e => e.length)
    cy.log(data)
    jsonData[0].data = data
    cy.writeFile('cypress/fixtures/xlsxData.json', { jsonData })
  })
  cy.parseXlsx('cypress/fixtures/test.xlsx').then(jsonData => {
    // finally we write the assertion rule to check
    // if that data matches the data we expected the excel file to have
    // ******************* NOTE: *********************
    // data[1] is the ROW that contains the data to be matched using the
    // const above
    cy.log(jsonData)
    let data = jsonData[0].data.slice(1)
    cy.writeFile('cypress/fixtures/testxlsx.json', { data })
  })
})
