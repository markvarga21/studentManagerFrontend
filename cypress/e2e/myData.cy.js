describe('user pages render test', () => {
    before(() => {
        cy.register();
    });

    after(() => {
        cy.fixture("user").then((user) => {
            cy.login(Cypress.env("username"), Cypress.env("password"));
            cy.deleteUser(user.username);
        })
    })

    beforeEach(() => {
        cy.fixture("user").then(user => {
            cy.visit('http://localhost:3000/login');
            cy.get('[data-testid="login-username"]')
                .type(user.username);
            cy.get('[data-testid="login-password"]')
                .type(user.password);
            cy.get('[data-testid="login-button"]')
                .click();
        })
    })

    it('should render the home page', () => {
        cy.fixture("user").then(user => {
            cy.get('[data-testid="home-title"]')
                .should('exist')
                .should('have.text', `Welcome, ${user.username}!`);
        });
    })

    it('should render the user my data page', () => {
        cy.get('[data-testid="data-nav"]')
            .click();
        cy.get('[data-testid="myData-title"]')
            .should('exist')
            .should('have.text', 'My data');
    })

    it('should render the report page', () => {
        cy.get('[data-testid="report-nav"]')
            .click();
        cy.get('[data-testid="report-title"]')
            .should('exist')
            .should('have.text', 'Report a problem');
    })

    it('should log out the user', () => {
        cy.get('[data-testid="settings-button"]')
            .click();
        cy.get('[data-testid="logout-icon"]')
            .click();
        cy.url().should('eql', 'http://localhost:3000/');
        cy.get('[data-testid="home-title"]')
            .should('exist')
            .should('have.text', 'Welcome!');
    })
});

describe('user data', () => {
    before(() => {
        cy.register();
    });

    after(() => {
        cy.fixture("user").then((user) => {
            cy.login(Cypress.env("username"), Cypress.env("password"));
            cy.deleteUser(user.username);
        })
    })

    beforeEach(() => {
        cy.fixture("user").then(user => {
            cy.visit('http://localhost:3000/login');
            cy.get('[data-testid="login-username"]')
                .type(user.username);
            cy.get('[data-testid="login-password"]')
                .type(user.password);
            cy.get('[data-testid="login-button"]')
                .click();
        })
    })

    it('should render add data page', () => {
        cy.get('[data-testid="data-nav"]')
            .click();
        cy.get('[data-testid="addData-button"]')
            .click();
    });

    it('should upload passport', () => {
        cy.intercept('POST', '/api/v1/form/extractData').as('extractData');
        cy.get('[data-testid="data-nav"]')
            .click();
        cy.get('[data-testid="addData-button"]')
            .click();
        cy.get('[data-testid="uploadPassport-button"]')
            .should('exist')
            .click();
        cy.get('[data-testid="passport-input"]')
            .selectFile('cypress/fixtures/passport.jpg', { force: true });
        cy.wait('@extractData').then(() => {
            cy.get('[data-testid="passport-input"]')
                .should('exist')
                .invoke('val')
                .should('not.be.empty');
        });
    })

    it('should upload portrait', () => {
        cy.get('[data-testid="data-nav"]')
            .click();
        cy.get('[data-testid="addData-button"]')
            .click();
        cy.get('[data-testid="uploadPortrait-button"]')
            .should('exist')
            .click();
        cy.get('[data-testid="portrait-input"]')
            .selectFile('cypress/fixtures/portrait.jpg', { force: true });
        cy.get('[data-testid="portrait-input"]')
            .should('exist')
            .invoke('val')
            .should('not.be.empty');
    })

    it('should extract data from passport', () => {
        cy.intercept('POST', '/api/v1/form/extractData').as('extractData');
        cy.get('[data-testid="data-nav"]')
            .click();
        cy.get('[data-testid="addData-button"]')
            .click();
        cy.get('[data-testid="addData-title"]')
            .should('exist')
            .should('have.text', 'Add student');
        cy.get('[data-testid="uploadPassport-button"]')
            .should('exist')
            .click();
        cy.get('[data-testid="passport-input"]')
            .selectFile('cypress/fixtures/passport.jpg', { force: true });
        cy.wait('@extractData').then((interception) => {
            cy.verifyAddDataFields();
        });
    });
});