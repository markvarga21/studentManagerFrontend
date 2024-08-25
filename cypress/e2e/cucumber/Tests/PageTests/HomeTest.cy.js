import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";
import homePage from "../../Pages/HomePage.cy.js";

Then('I with the {string} username should see the home page', (username) => {
    homePage.verifyHomePage(username);
});

When('I click on the register button on the welcome page', () => {
    homePage.clickOnRegister();
});

When('I click on the login button on the welcome page', () => {
    homePage.clickOnLogin();
});