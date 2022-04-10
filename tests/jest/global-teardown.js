/* eslint-disable unicorn/prefer-module */
const spawn = require('node:child_process')

module.exports = async () => {
  spawn.execSync('rm -rf .test-support')
}
