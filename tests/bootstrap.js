const app = require('../bootstrap/app')
const Database = require('../app/database')
const Command = new app.Command()
const Help = new app.Help()
const Bot = new app.Bot()
const Citation = new app.Citation()
const Offender = new app.Offender()
const Roe = new app.Roe()
const db = new Database()

console.log('Container is loaded... ')
console.log(typeof app === 'object')

console.log('Bot is instantiated... ')
console.log(typeof Bot === 'object')

console.log('Citation is instantiated... ')
console.log(typeof Citation === 'object')

console.log('Offender is instantiated... ')
console.log(typeof Offender === 'object')

console.log('Help is instantiated... ')
console.log(typeof Help === 'object')

console.log('Roe is instantiated... ')
console.log(typeof Roe === 'object')

console.log('Command is instantiated... ')
console.log(typeof Command === 'object')
