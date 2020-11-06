var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
const bodyParser = require('body-parser');

var app = express()

// const requestLogger= morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms',
//   ].join(' ')
// })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'))
// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))

app.use(morgan('combined'));
morgan.token('type', (req, res) => req.headers['content-type'])
// app.use(requestLogger)


var d = new Date()
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

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

// delete the person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


app.post('/api/persons', (request, response) => {
  const body = request.body
console.log(body);
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'please fill all the fields'
    })
  }
  if (all_names.includes(body.name) ===  true) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})