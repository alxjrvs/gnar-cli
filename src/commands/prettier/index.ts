import * as fs from 'node:fs'

import PackageInstaller from '../../utils/package-installer'
import PackageJson from '../../utils/package-json'

const PRETTIER_CONFIG_FILE_NAME = '.prettierrc'
const CONFIG = fs.readFileSync('../../.prettierrc', 'utf8')

class Prettier {
  public async run() {
    process.stdout.write('Setting up Prettier...\n\n')

    await this.installDependencies().then(this.writeConfig).then(this.updatePackageJson)
  }

  private async installDependencies() {
    return PackageInstaller.addDev('prettier', 'lint-staged', 'husky')
  }

  private async writeConfig() {
    process.stdout.write('Writing Prettier config to .prettierrc\n\n')
    fs.writeFileSync(PRETTIER_CONFIG_FILE_NAME, CONFIG)

    return Promise.resolve()
  }

  private updatePackageJson() {
    const scriptConfig = {
      scripts: {
        prettify: "prettier '*.{js,ts,tsx}' '{src,app,__tests__}/**/*.{js,ts,tsx}' --write",
      },
      'lint-staged': {
        '*.{js,ts,tsx,json,css,md}': ['prettier --write'],
      },
    }

    const packageJson = new PackageJson()
    packageJson.merge(scriptConfig)
    packageJson.write()
  }
}

export default Prettier
