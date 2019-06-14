module.exports = {
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "airbnb",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  env: {
    browser: true,
    node: true,
    jest: true
    },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  }
};
