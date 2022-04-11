import { execSync } from 'node:child_process'
import * as fs from 'node:fs'

import Npm from './npm'
import { PackageInstallable } from './types'
import Yarn from './yarn'

const YARN_LOCK_FILE = 'yarn.lock'

class PackageInstaller {
  public async addDev(...packages: string[]): Promise<void> {
    const packageString = packages.join(' ')
    const command = this.getPackageManager().addDev(packageString)

    process.stdout.write(`Installing dev dependencies via: ${command}\n\n`)

    execSync(command)

    return Promise.resolve()
  }

  private getPackageManager(): PackageInstallable {
    return fs.existsSync(YARN_LOCK_FILE) ? new Yarn() : new Npm()
  }
}

export default new PackageInstaller()
