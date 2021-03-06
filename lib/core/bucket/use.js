'use strict'

const db = require('../../db')

module.exports = function(name){

  let usingAccount = db('accounts').chain().find({ using: true })

  if (!usingAccount.value()) {
    console.log('No using account! Use `$ cown use <name> -a` to use an account.')
    return
  }

  function toggle(collection, symbol){
    return collection.map((item)=>{
      if (item.name === symbol) {
        item.isDefault = true
      } else {
        item.isDefault = false
      }
      return item
    })
  }

  usingAccount.assign({
    buckets: toggle(usingAccount.value().buckets, name)
  }).value()

  require('./ls')()
}