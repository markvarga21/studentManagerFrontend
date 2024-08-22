const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'docs/cypress',
      charts: true,
      reportFilename: 'index',
      overwrite: true,
      html: true,
      json: true,
    },
  },
});
