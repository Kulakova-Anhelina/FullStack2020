const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://bge887:${password}@cluster0.fcd9k.mongodb.net/phonebook-db?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)
const persons = new Person({
  name: name,
  number: number,
})

Person
  .find({})
  .then(result=> {
    console.log("Phonebook");
    result.forEach(persons => {
      console.log(`${persons.name} ${persons.number}`)
    })
    mongoose.connection.close()
  })
//
  persons.save().then(result => {
  console.log(`added ${persons.name} ${persons.number} to phonebook`)
  mongoose.connection.close()
})
