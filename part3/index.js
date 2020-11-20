const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser');
require('dotenv').config()
const Person = require('./models/person')

const cors = require('cors')


const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'))
app.use(logger)
morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));



const d = new Date()
// const generateId = () => {
//   const id = Math.floor(Math.random() * 1000)
//   return id
// }

app.get('/', (request, response) => {
  response.send('<div><p>Phonebook has info of ' + persons.length + '</p>' + d + '</div>')
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body
  console.log(body);

  const personShema = new Person({
    name: body.name,
    number: body.number,
  })
  personShema
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
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

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})