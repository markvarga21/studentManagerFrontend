import { slowCypressDown} from "cypress-slow-down";

slowCypressDown(200);

class MyDataPage {
    verifyPage() {
        cy.get('[data-testid="myData-title"]')
            .should('exist')
            .should('have.text', 'My data');
        return this;
    }

    verifyUserData() {
        cy.fixture("student").then((student) => {
            cy.get('[data-testid="display-firstName"]')
                .should('exist')
                .should('have.text', student.firstName);
            cy.get('[data-testid="display-lastName"]')
                .should('exist')
                .should('have.text', student.lastName);
            cy.get('[data-testid="display-birthDate"]')
                .should('exist')
                .should('have.text', student.birthDate);
            cy.get('[data-testid="display-gender"]')
                .should('exist')
                .should('have.text', student.gender);
            cy.get('[data-testid="display-placeOfBirth"]')
                .should('exist')
                .should('have.text', student.placeOfBirth);
            cy.get('[data-testid="display-countryOfCitizenship"]')
                .should('exist')
                .should('have.text', student.countryOfCitizenship);
            cy.get('[data-testid="display-passportNumber"]')
                .should('exist')
                .should('have.text', student.passportNumber);
            cy.get('[data-testid="display-passportDateOfIssue"]')
                .should('exist')
                .should('have.text', student.passportDateOfIssue);
            cy.get('[data-testid="display-passportDateOfExpiry"]')
                .should('exist')
                .should('have.text', student.passportDateOfExpiry);

        });
    }
}

const myDataPage = new MyDataPage();
export default myDataPage;