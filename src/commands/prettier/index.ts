import * as fs from 'node:fs'

import PackageInstaller from '../../utils/package-installer'
import PackageJson from '../../utils/package-json'

const PRETTIER_CONFIG_FILE_NAME = '.prettierrc'

class Prettier {
  public async run() {
    process.stdout.write('Setting up Prettier...\n\n')

    await this.installDependencies().then(this.writeConfig).then(this.updatePackageJson)
  }

  private async installDependencies() {
    return await PackageInstaller.addDev('prettier', 'lint-staged', 'husky')
  }

  private async writeConfig() {
    process.stdout.write('Writing Prettier config to .prettierrc\n\n')
    fs.writeFileSync(PRETTIER_CONFIG_FILE_NAME, config)

    return await Promise.resolve()
  }

  private updatePackageJson() {
    const scriptConfig = {
      scripts: {
        precommit: 'lint-staged',
        prettify: "prettier '*.{js,ts,tsx}' '{src,app,__tests__}/**/*.{js,ts,tsx}' --write",
      },
      'lint-staged': {
        '*.{js,ts,tsx,json,css,md}': ['prettier --write', 'git add'],
      },
    }

    const packageJson = new PackageJson()
    packageJson.merge(scriptConfig)
    packageJson.write()
  }
}

const config = `{
  trailingComma: "all",
  singleQuote: true,
  semi: false
}
`

export default Prettier
