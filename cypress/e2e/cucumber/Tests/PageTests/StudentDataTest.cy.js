import {Given, When, Then, And} from "cypress-cucumber-preprocessor/steps";
import studentDataPage from "../../Pages/StudentDataPage.cy.js";

Then('I should see the student data page', () => {
   studentDataPage.verifyStudentDataPage();
});

When('I click the add student button', () => {
    studentDataPage.clickAddStudentButton();
});

Then('I should see the add student modal', () => {
    studentDataPage.verifyAddModal();
});

When('I upload a portrait', () => {
    studentDataPage.uploadPortrait();
});

Then('I should see the portrait', () => {
    studentDataPage.verifyPortrait();
});

When('I upload a passport and save the student', () => {
    studentDataPage.uploadPassportAndSaveStudent();
});

Then('I should see the student added', () => {
    studentDataPage.verifyStudentAdded();
});

When('I delete the student', () => {
    studentDataPage.deleteStudent();
});

And('I confirm the deletion', () => {
    studentDataPage.confirmDeletion();
});

Then('I should not see any student in the list', () => {
    studentDataPage.verifyStudentDataPage();
})

When('I modify the students first name to {string}', (firstName) => {
    studentDataPage.modifyStudentFirstName(firstName);
});

And('I validate the student', () => {
    studentDataPage.validateStudent();
});

Then('I should see that the faces are matching but the data is not', () => {
    studentDataPage.validFaceCheck();
})

When('I accept the replacement value for the first name', () => {
   studentDataPage.acceptReplacement();
});

Then('I should see that the faces are not validated anymore', () => {
    studentDataPage.invalidFaceCheck();
})

When('I close the user modal', () => {
    studentDataPage.closeModal();
});

Then('I should see a valid student', () => {
    studentDataPage.validCheck();
});