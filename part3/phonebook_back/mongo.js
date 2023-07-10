const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://IrminDev:${password}@cluster0.tqz9ffe.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log('Phonebook:')
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else if(process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save().then(result => {
        console.log('person saved!')
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('Please provide the correct data as an argument')
    mongoose.connection.close()
    process.exit(1)
}