const { defineConfig } = require("cypress");

const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'docs/cypress',
    charts: true,
    embeddedScreenshots: true,
  },
  e2e: {
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('file:preprocessor', cucumber());
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  video: true,
});
