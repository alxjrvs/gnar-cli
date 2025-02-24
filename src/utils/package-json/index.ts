import * as fs from 'node:fs'
import { merge } from 'lodash'

class PackageJson {
  public contents: string

  constructor() {
    const packageJson = fs.readFileSync('package.json').toString()
    this.contents = JSON.parse(packageJson)
  }

  public merge(config: Record<string, unknown>): PackageJson {
    const prettyConfig = JSON.stringify(config, undefined, 2)

    process.stdout.write('Merging the following into your package.json... \n')
    process.stdout.write(`${prettyConfig}\n\n`)

    merge(this.contents, config)

    return this
  }

  public write() {
    const formattedJson = JSON.stringify(this.contents, undefined, 2)
    fs.writeFileSync('package.json', formattedJson)
  }
}

export default PackageJson
