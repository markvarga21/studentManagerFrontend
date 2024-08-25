class StudentDataPage {
    verifyStudentDataPage() {
        cy.get('[data-testid="studentList-title"]')
            .should('exist')
            .should('have.text', 'List of students');
        cy.get('[data-testid="student-list"]')
            .should('exist');
        return this;
    }

    clickAddStudentButton() {
        cy.get('[data-testid="admin-addData-button"]')
            .click();
        return this;
    }

    uploadPortrait() {
        cy.get('[data-testid="portrait-input"]')
            .selectFile('cypress/fixtures/portrait.jpg', {force: true});
        return this;
    }

    verifyPortrait() {
        cy.get('[data-testid="portrait-input"]')
            .should('exist')
            .invoke('val')
            .should('not.be.empty');
        return this;
    }

    uploadPassportAndSaveStudent() {
        cy.extractDataFromPassport(() => {
            cy.intercept('POST', '/api/v1/students?username=admin&roles=ROLE_ADMIN,ROLE_USER')
                .as('saveStudent');
            cy.verifyAddDataFields();
            cy.get('[data-testid="save-button"]')
                .click();
        });
        return this;
    }

    verifyStudentAdded() {
        cy.get('[data-testid="student-list"]')
            .should('exist')
            .children().should('have.length', 1);
        return this;
    }

    deleteStudent() {
        cy.get('[data-testid="delete-icon"]')
            .click();
        return this;
    }

    verifyAddModal() {
        cy.get('[data-testid="addData-title"]')
            .should('exist')
            .should('have.text', 'Add student');
        return this;
    }

    modifyStudentFirstName(newFirstName) {
        cy.intercept('GET', '/api/v1/students/**')
            .as('getStudent');
        cy.get('[data-testid="edit-icon"]')
            .click();
        cy.wait('@getStudent').then(() => {
            cy.get('[data-testid="firstName"]')
                .clear()
                .type(newFirstName);
            cy.get('[data-testid="save-button"]')
                .click();
        });
        return this;
    }

    validateStudent() {
        cy.intercept('POST', '/api/v1/validations/**')
            .as('validateStudent');
        cy.get('[data-testid="automaticValidation-button"]')
            .click();
        cy.wait('@validateStudent');
        return this;
    }

    invalidFaceCheck() {
        cy.get('[data-testid="facial-validity"]')
            .should('exist')
            .should('contain.text', '\u274C');
        return this;
    }

    validFaceCheck() {
        cy.get('[data-testid="facial-validity"]')
            .should('exist')
            .should('contain.text', '\u2705');
        return this;
    }

    closeModal() {
        cy.get('[data-testid="close-icon"]')
            .click();
        return this;
    }

    validCheck() {
        cy.get('[data-testid="student-validity"] span')
            .invoke('text')
            .should('eq', 'Valid');
        return this;
    }

    acceptReplacement() {
        cy.get('[data-testid="accept-replacement-for-firstName"]')
            .click();
        cy.get('[data-testid="save-button"]')
            .click();
        return this;
    }


}

const studentDataPage = new StudentDataPage();
export default studentDataPage;