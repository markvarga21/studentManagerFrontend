describe('handling students', () => {
    beforeEach(() => {
        cy.manualLogin();
        cy.get('[data-testid="data-nav"]')
            .click();
        cy.get('[data-testid="admin-addData-button"]')
            .click();
        cy.get('[data-testid="uploadPortrait-button"]')
            .should('exist')
            .click();
        cy.get('[data-testid="portrait-input"]')
            .selectFile('cypress/fixtures/portrait.jpg', {force: true});
        cy.get('[data-testid="portrait-input"]')
            .should('exist')
            .invoke('val')
            .should('not.be.empty');
        cy.extractDataFromPassport(() => {
            cy.intercept('POST', '/api/v1/students?username=admin&roles=ROLE_ADMIN,ROLE_USER')
                .as('saveStudent');
            cy.verifyAddDataFields();
            cy.get('[data-testid="save-button"]')
                .click();
        })
    })

    it('should display the single student', () => {
        cy.get('[data-testid="student-list"]')
            .should('exist')
            .children().should('have.length', 1);
        cy.get('[data-testid="delete-icon"]')
            .click();
    });


    it('should validate the student manually', () => {
        cy.get('[data-testid="edit-icon"]')
            .click();
        cy.get('[data-testid="manualValidation-button"]')
            .click();
        cy.get('[data-testid="facial-validity"]')
            .should('exist')
            .should('contain.text', 'Photos are 100.00% similar!');
        cy.get('[data-testid="close-icon"]')
            .click();
        cy.get('[data-testid="delete-icon"]')
            .click();
    });

    it('should modify and validate the student', () => {
        cy.intercept('GET', '/api/v1/students/**').as('getStudent');
        cy.get('[data-testid="edit-icon"]')
            .click();
        cy.wait('@getStudent').then(() => {
            cy.get('[data-testid="firstName"]')
                .clear()
                .type('John');
            cy.get('[data-testid="save-button"]')
                .click();
            cy.intercept('POST', '/api/v1/validations/**').as('validateStudent');
            cy.get('[data-testid="automaticValidation-button"]')
                .click();
            cy.wait('@validateStudent').then(() => {
                cy.get('[data-testid="facial-validity"]')
                    .should('exist')
                    .should('contain.text', '\u2705');
                cy.get('[data-testid="accept-replacement-for-firstName"]')
                    .click();
                cy.get('[data-testid="save-button"]')
                    .click();
                cy.intercept('POST', '/api/v1/validations/**').as('secondValidation');
                cy.get('[data-testid="automaticValidation-button"]')
                    .click();
                cy.wait('@secondValidation').then(() => {
                    cy.get('[data-testid="facial-validity"]')
                        .should('exist')
                        .should('contain.text', '\u274C');
                    cy.get('[data-testid="close-icon"]')
                        .click();
                    cy.get('[data-testid="student-validity"] span')
                        .invoke('text')
                        .should('eq', 'Valid');
                    cy.get('[data-testid="delete-icon"]')
                        .click();
                });
            })
        });
    });
})