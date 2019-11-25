module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "comma-dangle": ["error", "never"],
    "semi": ["error", "never"],
    "global-require": 0,
    "import/no-extraneous-dependencies": 0,
  }
}