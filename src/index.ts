#!/usr/bin/env node

import * as program from 'commander'
import Eslint from './commands/eslint'
import Prettier from './commands/prettier'

// tslint:disable no-var-requires
const VERSION = require('../package.json').version

program.version(VERSION)

program
  .command('prettier')
  .description('install prettier with default configuration and git hooks')
  .action(() => {
    new Prettier().run()
  })

program
  .command('eslint')
  .description('install eslint with default configuration')
  .action(() => {
    new Eslint().run()
  })

program.parse(process.argv)
