import {After, Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";
import register from "../../Pages/RegisterPage.cy.js";

After({tags: "@register"}, () => {
    cy.fixture("user").then((user) => {
        register.deleteRegisteredUser(user.username);
    });
});

Given('I visit the register page', () => {
    register.visitRegister();
});

Then('I should see the register page', () => {
   register.verifyPage();
});

When('I enter the registration data', () => {
    cy.fixture("user").then((user) => {
        register.enterRegisterDetails(
            user.username,
            user.email,
            user.firstName,
            user.lastName,
            user.password
        );
    })
});

And('I click the register button', () => {
    register.clickRegister();
});

Then('I should be registered', () => {
    register.verifyRegister();
});

And('The user should be deleted', () => {
    cy.fixture("user").then((user) => {
        register.deleteRegisteredUser(user.username);
    });
});

