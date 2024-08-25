@register
Feature: I want to register
  Background:
    Given I visit the register page
    Then I should see the register page
    Scenario: Register with valid credentials
      When I enter the registration data
      And I click the register button
      Then I should be registered