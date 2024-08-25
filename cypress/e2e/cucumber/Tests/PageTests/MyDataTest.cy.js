import {Given, When, Then, And, After} from "cypress-cucumber-preprocessor/steps";
import myDataPage from "../../Pages/MyDataPage.cy.js";
import registerPage from "../../Pages/RegisterPage.cy.js";

When('I delete the user', () => {
    cy.fixture("user").then((user) => {
        registerPage.deleteRegisteredUser(user.username);
    });
});

Then('I should see the my data page', () => {
    myDataPage.verifyPage();
});

Then('I should see my data', () => {
    myDataPage.verifyUserData();
})

