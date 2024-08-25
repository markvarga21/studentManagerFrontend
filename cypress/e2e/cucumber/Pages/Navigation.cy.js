class Navigation {
    clickHome() {
        cy.get('[data-testid="home-nav"]')
            .click();
        return this;
    }

    clickData() {
        cy.get('[data-testid="data-nav"]')
            .click();
        return this;
    }

    clickReport() {
        cy.get('[data-testid="report-nav"]')
            .click();
        return this;
    }

    clickLogout() {
        cy.get('[data-testid="settings-button"]')
            .click();
        cy.get('[data-testid="logout-icon"]')
            .click();
        return this;
    }

    verifyWelcomePage() {
        cy.url().should('eql', 'http://localhost:3000/');
        cy.get('[data-testid="home-title"]')
            .should('exist')
            .should('have.text', 'Welcome!');
        return this;
    }
}

const navigation = new Navigation();
export default navigation;