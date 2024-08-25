class LoginPage {
    visitLogin() {
        cy.visit('http://localhost:3000/login');
    }

    verifyPage() {
        cy.get('[data-testid="login-username"]')
            .should('exist');
        cy.get('[data-testid="login-password"]')
            .should('exist');
        cy.get('[data-testid="login-button"]')
            .should('exist');
        cy.url()
            .should('include', '/login');
        return this;
    }

    enterLoginDetails(username, password) {
        cy.get('[data-testid="login-username"]')
            .type(username);
        cy.get('[data-testid="login-password"]')
            .type(password);
        return this;
    }

    clickLogin() {
        cy.get('[data-testid="login-button"]')
            .click();
        return this;
    }

    verifyLogin(username) {
        return cy.get('[data-testid="home-title"]')
            .should('exist')
            .should('have.text', `Welcome, ${username}!`);
    }
}

const login = new LoginPage();
export default login;