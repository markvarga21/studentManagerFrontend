Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8080/api/v1/auth/login',
        body: {
            username: username,
            password: password
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        const token = response.body;
        Cypress.env('authToken', token);
    });
});

Cypress.Commands.add('deleteUser', (username) => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:8080/api/v1/auth/users/username/${username}`,
        headers: {
            Authorization: `Bearer ${Cypress.env('authToken')}`
        }
    });
})

Cypress.Commands.add('register', () => {
    cy.fixture("user").then(user => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/auth/register',
            body: user
        })
    })
})

Cypress.Commands.add('verifyAddDataFields', () => {
    cy.fixture("student").then(student => {
        cy.get('[data-testid="firstName"]')
            .should('have.value', student.firstName);
        cy.get('[data-testid="lastName"]')
            .should('have.value', student.lastName);
        cy.get('[data-testid="gender"]')
            .should('have.value', student.gender);
        cy.get('[data-testid="birthDate"]')
            .should('have.value', student.birthDate);
        cy.get('[data-testid="placeOfBirth"]')
            .should('have.value', student.placeOfBirth);
        cy.get('[data-testid="countryOfCitizenship"]')
            .should('have.value', student.countryOfCitizenship);
        cy.get('[data-testid="passportNumber"]')
            .should('have.value', student.passportNumber);
        cy.get('[data-testid="passportDateOfExpiry"]')
            .should('have.value', student.passportDateOfExpiry);
        cy.get('[data-testid="passportDateOfIssue"]')
            .should('have.value', student.passportDateOfIssue);
    });
})