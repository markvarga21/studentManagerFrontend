describe('login test', () => {
  it('should render the login title', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="login-title"]')
        .should('exist')
        .should('have.text', 'Login');
  })

  it('should render the login inputs and button', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="login-username"]')
        .should('exist');
    cy.get('[data-testid="login-password"]')
        .should('exist');
    cy.get('[data-testid="login-button"]')
        .should('exist');
  })

  it('should navigate to register page', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="register-link"]')
        .should('exist')
        .click();
    cy.url().should('include', '/register');
  })

  it('should login successfully', () => {
    const username = Cypress.env("username");
    const password = Cypress.env("password");
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid="login-username"]')
        .type(username);
    cy.get('[data-testid="login-password"]')
        .type(password);
    cy.get('[data-testid="login-button"]')
        .click();
    cy.get('[data-testid="home-title"]')
        .should('exist')
        .should('have.text', `Welcome, ${username}!`);
  })
})

describe('register test', () => {

})