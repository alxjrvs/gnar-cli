#!/usr/bin/env node

import { program } from 'commander'

import Eslint from './commands/eslint'
import Prettier from './commands/prettier'

program.version('0.0.dev')

program
  .command('prettier')
  .description('install prettier with default configuration and git hooks')
  .action(() => {
    new Prettier().run().catch(error => console.log(error))
  })

program
  .command('eslint')
  .description('install eslint with default configuration')
  .action(() => {
    new Eslint().run().catch(error => console.log(error))
  })

program.parse(process.argv)
