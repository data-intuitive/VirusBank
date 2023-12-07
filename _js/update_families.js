const fs = require('fs')
const args = require('minimist')(process.argv.slice(2));

console.log(">> -o argument " + args.o)
const overwrite = args.o == "yes"
console.log(">> Overwriting... " + overwrite )

const families = require('../families.json')
const update_family = require('./update_family.js')

console.log(">> Families: " + families.join(", "))

families.map( family => {
  console.log(">>> this family: " + family)
  update_family(family, overwrite)
})
