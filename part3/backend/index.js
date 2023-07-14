require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('content', function (req){
    if(req.method === 'POST') {
        return JSON.stringify(req.body)
    } else {
        return null
    }
})

const Person = require('./model/person')

app.get('/', (req, res) => {
    res.send('<h1>Phonebook project</h1>')
})

app.get('/info', (req, res) => {
    res.send(`<h1>App has info about ${persons.length} people</h1>
                ${Date()}
`)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
   /* const person = persons.find(p => p.id === id);
    if(persons){
        res.json(person)
    } else {
        res.status(404).end()
    }*/
   Person.findById(req.params.id).then(person => {
       res.json(person);
   })
})
/*
const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0
    return maxId + 1
}
*/
app.post('/api/persons', (req, res) => {
    const body = req.body
    const personName = body.name;
    const personNumber = body.number;

   // const duplicateName = persons.find(p => p.name.toLowerCase() === personName.toLowerCase())

/*
    if (!personName || !personNumber){
        return res.status(400).json({
            error: 'Missing information'
        })
    } else if (duplicateName){
        return res.status(400).json({
            error: 'Name must be unique'
        })
    }
*/
    const person = new Person({
        name: personName,
        number: personNumber
    });
    //persons = persons.concat(person)

    person.save().then(savedPerson => {
      res.json(savedPerson)
    })

})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

const unknownEndpoint = (req,res) => {
    res.status(404).send({ error: 'Unknown Endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
