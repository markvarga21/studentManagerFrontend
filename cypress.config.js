const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'docs/cypress',
    charts: true,
    embeddedScreenshots: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  video: true,
});
