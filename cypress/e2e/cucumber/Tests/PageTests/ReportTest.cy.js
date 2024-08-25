import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";
import reportPage from "../../Pages/ReportPage.cy.js";

Then('I should see the report page', () => {
    reportPage.verifyReportPage();
});