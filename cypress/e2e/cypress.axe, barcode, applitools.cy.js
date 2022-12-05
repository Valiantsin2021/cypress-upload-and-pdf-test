describe(`A11y test with cypress axe`, () => {
  it(`Should test accecibillity for love.pdf website`, () => {
    cy.visit("/");
    cy.injectAxe();
    cy.checkA11y();
  });
  it(`Should exclude specific elements for accecibillity test for love.pdf website`, () => {
    cy.visit("/");
    cy.injectAxe();
    cy.checkA11y(
      { exclude: ['h2[class="title"]'] },
      { includedImpacts: ["critical", "serious"] }
    );
  });
  it(`Should include only specific elements for accecibillity test for love.pdf website`, () => {
    cy.visit("/");
    cy.injectAxe();
    cy.checkA11y("h1.title");
  });
  it(`Should include only specific elements for accecibillity test for love.pdf website`, () => {
    cy.visit("/");
    cy.injectAxe();
    cy.checkA11y(null, { rules: [] });
  });
  // it.only("applitools", () => {
  //   cy.visit("https://applitools.com/helloworld");
  //   cy.eyesOpen({
  //     appName: "Hello World!",
  //     testName: "My first JavaScript test!",
  //     browser: { width: 800, height: 600 },
  //   });
  //   cy.eyesCheckWindow("Main Page");
  //   cy.get("button").click();
  //   cy.eyesCheckWindow("Click!");
  //   cy.eyesClose();
  // });
  it(`Handle barcodes`, () => {
    cy.visit("https://testautomationpractice.blogspot.com/");
    cy.get("#HTML12 img")
      .as("images")
      .eq(0)
      .readCode()
      .should("have.property", "text", "ABC-abc-123");
    cy.get("@images")
      .eq(1)
      .readCode()
      .should("have.property", "text", "Hi this is Pavan");
    cy.get("#HTML4 img")
      .readCode()
      .should("have.property", "text", "Welcome to Selenium");
  });
});
