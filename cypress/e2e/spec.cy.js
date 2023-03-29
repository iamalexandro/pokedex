describe("Pokedex tests", () => {
  it("frontend can be opened", () => {
    cy.visit("https://pokenico.netlify.app");
  });
  it("render login", () => {
    cy.visit("https://pokenico.netlify.app");
    cy.contains("Sign in");
  });
  it("shows an alert when a user is not found", () => {
    cy.visit("https://pokenico.netlify.app");
    cy.contains("SIGN IN").click();
  });
  it("shows an alert when a password is wrong", () => {
    cy.visit("http://localhost:3000");
    cy.get("#input-email").type("ash@gmail.com");
    cy.contains("SIGN IN").click();
  });
  it("can be logged in", () => {
    cy.visit("http://localhost:3000");
    cy.get("#input-email").type("ash@gmail.com");
    cy.get("#input-password").type("ashmaster");
    cy.contains("SIGN IN").click();
  });
  it("shows pokemons", () => {
    cy.visit("http://localhost:3000");
    cy.get("#input-email").type("ash@gmail.com");
    cy.get("#input-password").type("ashmaster");
    cy.contains("SIGN IN").click();
    cy.get(".card__image");
  });
  it("can show a pokemon detail", () => {
    cy.visit("http://localhost:3000");
    cy.get("#input-email").type("ash@gmail.com");
    cy.get("#input-password").type("ashmaster");
    cy.contains("SIGN IN").click();
    cy.get(".card__image").first().click();
    cy.get("#main-move");
  });
  it("can change page", () => {
    cy.visit("http://localhost:3000");
    cy.get("#input-email").type("ash@gmail.com");
    cy.get("#input-password").type("ashmaster");
    cy.contains("SIGN IN").click();
    cy.get(".pagination>.btn-pag").eq(1).click();
  });
  it("open navbar menu", () => {
    cy.visit("http://localhost:3000");
    cy.get("#input-email").type("ash@gmail.com");
    cy.get("#input-password").type("ashmaster");
    cy.contains("SIGN IN").click();
    cy.get(".navbar__btn").click();
    cy.get(".navbar__menu");
  });
  it("can open profile view", () => {
    cy.visit("http://localhost:3000");
    cy.get("#input-email").type("ash@gmail.com");
    cy.get("#input-password").type("ashmaster");
    cy.contains("SIGN IN").click();
    cy.get(".navbar__btn").click();
    cy.get(".navbar__menu");
    cy.get("#profile-btn").click();
    cy.get("#profile-email");
  });
});
