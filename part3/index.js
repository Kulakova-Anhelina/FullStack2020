const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser');
require('dotenv').config()
const Person = require('./models/person')

const cors = require('cors')



app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'))
morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));


const d = new Date()
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
]

const generateId = () => {
  const id = Math.floor(Math.random() * 1000)
  return id
}


let all_names = persons.map((n) => n.name)

app.get('/', (request, response) => {
  response.send('<div><p>Phonebook has info of ' + persons.length + '</p>' + d + '</div>')
})


app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(body);
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'please fill all the fields'
    })
  }
  if (all_names.includes(body.name) === true) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const personShema = new Person({
    name: body.name,
    number: body.number,
  })

  personShema.save().then(personSaved => {
    response.json(personSaved)
  })
})


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    console.log(persons)
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(people => {
    if (people) {
      response.json(people.toJSON())
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))

})

app.use(morgan('dev', { skip: function (req, res) { return res.statusCode < 400 } }))

// delete the person
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// update person
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatePerson => {
      response.json(updatePerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})