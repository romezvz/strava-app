const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      curly: 'error',
      eqeqeq: 'error',
      quotes: ['warn', 'single'],
      complexity: [
        'warn',
        {
          max: 30,
        },
      ],
      'import/no-unassigned-import': 'off',
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'warn',
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'no-var': 'warn',
      'no-lonely-if': 'warn',
      'no-unused-vars': 'warn',
      'no-else-return': 'error',
      'no-empty-function': 'error',
      'no-magic-numbers': 'error',
      'no-trailing-spaces': 'error',
      'no-case-declarations': 'off',
      'no-duplicate-imports': 'warn',
      'no-unused-expressions': 'off',
      'no-unexpected-multiline': 'off',
      'no-multiple-empty-lines': 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      'prefer-const': 'warn',
      'require-await': 'error',
      'sort-keys': 'off',
      'max-classes-per-file': ['error', 5],
      'max-len': [
        'off',
        {
          code: 160,
        },
      ],
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-empty-interface': ['error'],
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-non-null-assertion': ['error'],
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            'public-constructor',
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method',
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
  {
    files: ['**/*.json'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
);
