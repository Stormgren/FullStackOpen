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

const requestLogger = (request, response, next) => {
    console.log("Method:", request.method);
    console.log("Path:  ", request.path);
    console.log("Body:  ", request.body);
    console.log("---");
    next();
};

morgan.token('content', function (req){
    if(req.method === 'POST') {
        return JSON.stringify(req.body)
    } else {
        return null
    }
})

/*
const errorHandler = (error, req, res, next) => {
    if(error.name === "CastError"){
        return res.status(400).send({ error: "malformatted id"})
    } else if (error.name === "ValidationError"){
        return res.status(400).json({error: error.message})
    }

    next(error)
}
*/
const Person = require('./model/person')

app.get('/', (req, res) => {
    res.send('<h1>Phonebook project</h1>')
})

app.get('/info', (req, res, error) => {
    Person.find({}).then(persons => {
        res.send(`<h1>App has info about ${persons.length} people</h1> <br/> ${Date()}`)
    }).catch(error => next(error))

})

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = Number(req.params.id);

   Person.findById(req.params.id).then(person => {
       if(person) {
           res.json(person);
       } else {
           res.status(404).end()
       }
   }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    const personName = body.name;
    const personNumber = body.number;

    if (!personName) {
        return res.status(400).json({
            error: 'name is missing'
        })
    } else if (!personNumber){
        return res.status(400).json({
            error: 'number is missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    }).catch(error => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
        .then(updated => res.json(updated.toJSON()))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id).then(result => {
      res.status(204).end()
  }).catch(error => next(error));
})

const unknownEndpoint = (req,res) => {
    res.status(404).send({ error: 'Unknown Endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, req, res, next) => {
    if(error.name === "CastError"){
        return res.status(400).send({ error: "malformatted id"})
    } else if (error.name === "ValidationError"){
        return res.status(400).json({error: error.message})
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
