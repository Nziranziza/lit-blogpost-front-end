module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testRegex: "(src/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$",
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.(js|jsx)"],
  coveragePathIgnorePatterns: ["coverage", "node_modules"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest"
  },
  setupFiles: ["./enzyme.config.js"]
};
