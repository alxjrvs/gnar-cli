#!/usr/bin/env node

import { program } from 'commander'

import Eslint from './commands/eslint'
import Prettier from './commands/prettier'

program.version('0.0.dev')

program
  .command('prettier')
  .description('install Prettier with Gnarly configuration')
  .action(async () => {
    await new Prettier().run()
  })

program
  .command('eslint')
  .description('install ESLint with Gnarly configuration - now with Prettier!')
  .action(async () => {
    await new Prettier().run()
    await new Eslint().run()
  })

program.parse(process.argv)
