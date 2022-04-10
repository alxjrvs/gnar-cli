import { execSync } from 'node:child_process'
import * as fs from 'node:fs'

import Npm from './npm'
import Yarn from './yarn'

export interface PackageInstallable {
  addDev: (packages: string) => string
}

const YARN_LOCK_FILE = 'yarn.lock'

class PackageInstaller {
  public async addDev(...packages: string[]): Promise<void> {
    const packageString = packages.join(' ')
    const command = this.getPackageManager().addDev(packageString)

    process.stdout.write(`Installing dev dependencies via: ${command}\n\n`)

    execSync(command)

    return await Promise.resolve()
  }

  private getPackageManager(): PackageInstallable {
    return fs.existsSync(YARN_LOCK_FILE) ? new Yarn() : new Npm()
  }
}

export default new PackageInstaller()
