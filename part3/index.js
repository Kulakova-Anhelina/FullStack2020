var express = require('express')

var morgan = require('morgan')

var bodyParser = require('body-parser');

var app = express()

app.use(bodyParser.json());
// setup the logger


//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

morgan.token("data", (req, res) => { const { body } = req; return JSON.stringify(body) });


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))



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

app.use(morgan('dev', { skip: function (req, res) { return res.statusCode < 400 } }))

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
  if (all_names.includes(body.name) === true) {
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