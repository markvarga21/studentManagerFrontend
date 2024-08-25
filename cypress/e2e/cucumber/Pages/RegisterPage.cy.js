class RegisterPage {
    visitRegister() {
        cy.visit('http://localhost:3000/register');
    }

    verifyPage() {
        cy.get('[data-testid="register-title"]')
            .should('exist')
            .should('have.text', 'Sign Up');
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
        return this;
    }

    enterRegisterDetails(username, email, firstName, lastName, password) {
        cy.get('[data-testid="register-username"]')
            .type(username);
        cy.get('[data-testid="register-email"]')
            .type(email);
        cy.get('[data-testid="register-firstName"]')
            .type(firstName);
        cy.get('[data-testid="register-lastName"]')
            .type(lastName);
        cy.get('[data-testid="register-password"]')
            .type(password);
        return this;
    }

    clickRegister() {
        cy.get('[data-testid="register-button"]')
            .click();
        return this;
    }

    verifyRegister() {
        cy.url()
            .should('include', '/login');
        return this;
    }

    deleteRegisteredUser(username) {
        const adminUsername = Cypress.env("username");
        const adminPassword = Cypress.env("password");
        cy.login(adminUsername, adminPassword);
        cy.deleteUser(username);
        return this;
    }
}

const register = new RegisterPage();
export default register;