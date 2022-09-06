module.exports = {
    env: {
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      'prettier'
    ],
    rules: {
      // override/add rules settings here, such as:
      'vue/no-unused-vars': 'error',
      'vue/no-deprecated-v-is': 'warn',
      'vue/no-dupe-v-else-if': 'error',
      'no-debugger': 'error',
      'vue/multi-word-component-names': 'warn',
      'vue/v-on-event-hyphenation': 'warn',
      'no-console': 'warn',
      'camelcase': 'warn',
      'vue/html-end-tags': 'error',
    }
  }
  