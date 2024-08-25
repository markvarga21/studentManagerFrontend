class HomePage {
    verifyHomePage(username) {
        cy.get('[data-testid="home-title"]')
            .should('exist')
            .should('have.text', `Welcome, ${username}!`);
    }

    clickOnRegister() {
        cy.get('[data-testid="welcome-register-button"]')
            .click();
    }

    clickOnLogin() {
        cy.get('[data-testid="welcome-login-button"]')
            .click();
    }
}

const homePage = new HomePage();
export default homePage;