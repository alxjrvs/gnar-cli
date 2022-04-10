import { execSync } from 'node:child_process'

import { commandTestPath, readExampleFile, readTestFile } from './tests/index'

describe('Gnar-CLI', () => {
  describe.each([
    ['eslint', ['.eslintrc.json', 'package.json']],
    ['prettier', ['.prettierrc', 'package.json']],
  ])('%s', (command, files) => {
    beforeAll(() => {
      const path: string = commandTestPath(command)
      execSync(`SKIP_VERSION=true yarn build --outDir .test-support/dist`)
      execSync(`mkdir -p .test-support/${command}`)
      execSync(`cd ${path} && yarn init --yes`)
      execSync(`cd ${path} && yarn install`)
      execSync(`cd ${path} && node ./../dist/index.js ${command}`)
    })

    test.each(files)('has expected file output for %s', file => {
      expect(readTestFile(command, file)).toBe(readExampleFile(command, file))
    })
  })
})
