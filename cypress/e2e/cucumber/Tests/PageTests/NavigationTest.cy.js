import {Before, When, Then, After} from "cypress-cucumber-preprocessor/steps";
import navigation from "../../Pages/Navigation.cy.js";
import register from "../../Pages/RegisterPage.cy";

Before({tags: "@navigation"}, () => {
    register.visitRegister();
    register.verifyPage();
    cy.fixture("user").then((user) => {
        register.enterRegisterDetails(
            user.username,
            user.email,
            user.firstName,
            user.lastName,
            user.password
        );
        register.clickRegister();
    });
})

After({tags: "@navigation"}, () => {
    cy.fixture("user").then((user) => {
        register.deleteRegisteredUser(user.username);
    });
})

When('I click the home button', () => {
    navigation.clickHome();
});

When('I click the data button', () => {
    navigation.clickData();
});

When('I click the report button', () => {
    navigation.clickReport();
});

When('I click the logout button', () => {
    navigation.clickLogout();
});

Then('I should see the welcome page', () => {
    navigation.verifyWelcomePage();
});