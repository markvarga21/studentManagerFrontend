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

Cypress.Commands.add("logout", () => {
    cy.get('[data-testid="settings-button"]').click();
    cy.get('[data-testid="logout-icon"]').click();
})