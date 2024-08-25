import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";
import login from "../../Pages/LoginPage.cy";

Given('I visit the login page', () => {
    login.visitLogin();
});

Then('I should see the login page', () => {
    login.verifyPage();
});

When('I enter my login details', () => {
    const username = Cypress.env("username");
    const password = Cypress.env("password");
    login.enterLoginDetails(username, password);
});

When('I enter my username {string} and password {string}', (username, password) => {
    login.enterLoginDetails(username, password);
});

And('I click the login button', () => {
    login.clickLogin();
});

Then('I should be logged in with the {string} username', (username) => {
    login.verifyLogin(username);
});