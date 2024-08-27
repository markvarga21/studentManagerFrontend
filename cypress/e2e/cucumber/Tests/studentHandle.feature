Feature: I want to add- and then validate a student
  Background:
    Given I visit the login page
    And I enter my login details
    And I click the login button
    Then I should be logged in with the "admin" username
  Scenario: Add a student
    When I click the data button
    Then I should see the student data page
    When I click the add student button
    Then I should see the add student modal
    When I upload a portrait
    Then I should see the portrait
    When I upload a passport and save the student
    Then I should see the student added
  Scenario: User should see the added data
    When I click the logout button
    Then I click on the register button on the welcome page
    Then I should see the register page
    When I enter the registration data
    And I click the register button
    Then I should be registered
    When I enter my username "mihaela.popescu" and password "mihaela*123"
    And I click the login button
    Then I should be logged in with the "mihaela.popescu" username
    When I click the data button
    Then I should see the my data page
    And I should see my data
  Scenario: Validate the student data
    When I click the data button
    When I modify the students first name to "John"
    And I validate the student
    Then I should see that the faces are matching but the data is not
    When I accept the replacement value for the first name
    Then I should see that the faces are not validated anymore
    When I validate the student
    And I close the user modal
    Then I should see a valid student
  Scenario: Delete a student
    When I click the data button
    Then I should see the student data page
    When I delete the student
    And I confirm the deletion
    Then I should not see any student in the list
  Scenario: Delete the created user
    Then I delete the user