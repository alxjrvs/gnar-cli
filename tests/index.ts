import { readFileSync } from 'node:fs'

export const commandTestPath = (command: string): string => `.test-support/${command}`
const commandSupportPath = (command: string): string => `tests/test-examples/${command}`

const readFile = (directory: string, filename: string): string => {
  return readFileSync(`${directory}/${filename}`, 'utf8')
}

const bigStrip = (contents: string): string => contents.replace(/(\r\n|\n|\r)/gm, '').replace(/\s/g, '')

export const readExampleFile = (command: string, filename: string): string => {
  return bigStrip(readFile(commandSupportPath(command), `fake-${filename}`))
}

export const readTestFile = (command: string, filename: string): string => {
  return bigStrip(readFile(commandTestPath(command), filename))
}
