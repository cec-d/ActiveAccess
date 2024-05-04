// jest.config.js
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/tests/setupTestDB.js'], // Replace with your actual setup file
    testEnvironment: 'node', // Use 'node' environment for backend testing
    verbose: true // Print individual test results
  };
  