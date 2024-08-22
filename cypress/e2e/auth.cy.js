describe('login test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    })

    it('should render the login title', () => {
        cy.get('[data-testid="login-title"]')
            .should('exist')
            .should('have.text', 'Login');
    })

    it('should render the login inputs and button', () => {
        cy.get('[data-testid="login-username"]')
            .should('exist');
        cy.get('[data-testid="login-password"]')
            .should('exist');
        cy.get('[data-testid="login-button"]')
            .should('exist');
    })

    it('should navigate to register page', () => {
        cy.get('[data-testid="register-link"]')
            .should('exist')
            .click();
        cy.url().should('include', '/register');
    })

    it('should login successfully', () => {
        const username = Cypress.env("username");
        const password = Cypress.env("password");
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
    beforeEach(() => {
        cy.visit('http://localhost:3000/register');
    })

    after(() => {
        cy.fixture("user").then(user => {
            cy.login(Cypress.env("username"), Cypress.env("password"));
            cy.deleteUser(user.username);
        });
    })

    it('should render the register page', () => {
        cy.get('[data-testid="register-title"]')
            .should('exist')
            .should('have.text', 'Sign up');
    })

    it('should render the register inputs and button', () => {
        cy.get('[data-testid="register-username"]')
            .should('exist');
        cy.get('[data-testid="register-email"]')
            .should('exist');
        cy.get('[data-testid="register-firstName"]')
            .should('exist');
        cy.get('[data-testid="register-lastName"]')
            .should('exist');
        cy.get('[data-testid="register-password"]')
            .should('exist');
        cy.get('[data-testid="register-button"]')
            .should('exist');
    })

    it('should register successfully', () => {
        cy.fixture("user").then((user) => {
            cy.get('[data-testid="register-username"]')
                .type(user.username);
            cy.get('[data-testid="register-email"]')
                .type(user.email);
            cy.get('[data-testid="register-firstName"]')
                .type(user.firstName);
            cy.get('[data-testid="register-lastName"]')
                .type(user.lastName);
            cy.get('[data-testid="register-password"]')
                .type(user.password);
            cy.get('[data-testid="register-button"]')
                .click();
            cy.wait(1000);
        })
    })
})