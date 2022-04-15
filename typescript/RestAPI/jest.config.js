/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {  // eslint-disable-line no-undef
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,  // Doesn't let hanging handles prevent jest from exiting.
  // Remember to restart jest watch if you make a change to the following...
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
