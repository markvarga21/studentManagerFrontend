Feature: I want to log in to the application
  Background:
    Given I visit the login page
    Then I should see the login page
  Scenario: Log in with valid credentials
    When I enter my login details
    And I click the login button
    Then I should be logged in with the "admin" username