module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:prettier/recommended', // Add this line
  ],
  rules: {
    'prettier/prettier': 'error', // Optional: show Prettier errors as ESLint errors
  },
};
