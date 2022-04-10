import * as fs from 'node:fs'
import packageInstaller from '../../utils/package-installer'
import PackageJson from '../../utils/package-json'

const CONFIG_FILE_NAME = '.eslintrc.json'

const CONFIG = `{
  "env": {
      "browser": true,
      "es2021": true
  },
  "plugins": [
      "@typescript-eslint",
      "prettier"
  ],
  "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "airbnb",
      "airbnb-typescript",

      "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "project": "./tsconfig.json",
      "createDefaultProgram": true
  },
  "rules": {
      "arrow-body-style": [
          1,
          "as-needed"
      ],
      "class-methods-use-this": "off",
      "func-names": [
          "error",
          "never"
      ],
      "import/no-webpack-loader-syntax": "off",
      "import/order": [
          "error",
          {
              "groups": [
                  "builtin",
                  "external",
                  "internal",
                  "sibling",
                  "index",
                  "parent"
              ]
          }
      ],
      "no-else-return": "off",
      "no-underscore-dangle": "off",
      "no-unused-vars": [
          "error",
          {
              "vars": "local",
              "varsIgnorePattern": "_",
              "args": "after-used",
              "argsIgnorePattern": "_"
          }
      ],
      "no-use-before-define": "off",
      "react/jsx-filename-extension": "off"
  }
}`

class Eslint {
  public async run() {
    process.stdout.write('Setting up eslint...\n\n')

    await this.installDependencies()
    await this.writeConfig()
    this.updatePackageJson()
  }

  private async installDependencies() {
    return packageInstaller.addDev(
      'eslint',
      'eslint-config-airbnb',
      'eslint-config-prettier',
      'eslint-config-standard-with-typescript',
      'eslint-plugin-import',
      'eslint-plugin-jest',
      'eslint-plugin-jest-formatting',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-node',
      'eslint-plugin-prettier',
      'eslint-plugin-promise',
      'eslint-plugin-react',
      'eslint-plugin-regexp',
      'eslint-plugin-simple-import-sort',
      'eslint-plugin-unused-imports',
    )
  }

  private async writeConfig() {
    process.stdout.write(`Writing the following config to ${CONFIG_FILE_NAME}\n\n`)

    fs.writeFileSync(CONFIG_FILE_NAME, CONFIG)

    return Promise.resolve()
  }

  private updatePackageJson() {
    const scriptConfig = {
      scripts: {
        lint: 'eslint . -c .eslintrc.json',
      },
      'lint-staged': {
        '*.{js,jsx,ts,tsx}': 'eslint . -c .eslintrc.json --cache --fix',
      },
    }

    const packageJson = new PackageJson()
    packageJson.merge(scriptConfig)
    packageJson.write()
  }
}

export default Eslint
