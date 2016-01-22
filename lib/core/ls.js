'use strict'

const low = require('lowdb')
const storage = require('lowdb/file-sync')
const db = low('db.json', { storage })
const colors = require('colors')

module.exports = function(){
  // let accounts = db('accounts').value()
  if (db('accounts').size() === 0) {
    console.log('No account yet! Use `$ cown add` to add an account.')
  } else {
    db('accounts').value().map((account)=>{
      account.using ? console.log(colors.green(`* ${account.name}`)) : console.log(`  ${account.name}`)
    })
  }
}