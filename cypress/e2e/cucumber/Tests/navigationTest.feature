@navigation
Feature: I want to verify the navigation in the application as a user
  Background:
    Given I visit the login page
    And I should see the login page
    When I enter my username "mihaela.popescu" and password "mihaela*123"
    And I click the login button
    Then I should be logged in with the "mihaela.popescu" username
  Scenario: Navigate to the home page
    When I click the home button
    Then I with the "mihaela.popescu" username should see the home page
  Scenario: Navigate to the my data page
    When I click the data button
    Then I should see the my data page
  Scenario: Navigate to the report page
    When I click the report button
    Then I should see the report page
  Scenario: Log out the user
    When I click the logout button
    Then I should see the welcome page