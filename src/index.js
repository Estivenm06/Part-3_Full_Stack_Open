const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
require("dotenv").config()
const Person = require("../models/persons")

app.use(express.json())
app.use(cors())
app.use(express.static("dist"))
//MORGAN
morgan.token("data", (req) => {
    const { body } = req;
    return JSON.stringify(body)
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))
//GET ALL
app.get("/api/persons", (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})
//GET INFO
app.get("/info", (req, res) => {
   const currentDate = new Date()
    Person.find({}).then(persons => {
        res.send(`<p>Phonebook has info for ${persons.length} people<p/><p>${currentDate}<p/>`)
    })
})
//GET JUST ONE
app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id).then(note => {
        res.json(note)
    }).catch(error => next(error))

})
    
//DELETE
app.delete("/api/persons/:id", (req, res, next) => {
   const id = req.params.id
   Person.findByIdAndDelete(id).then(() => {
        res.status(204).end()
   }).catch(error => next(error))
})
//POST
app.post("/api/persons", (req, res, next) => {
    const body = req.body
    const personName = body.name
    const personNumber = body.number
    if(!body.name || !body.number){
        return res.status(400).json({error: "content missing"})
    }
    const newPerson = new Person({
        name: personName,
        number: personNumber
    })
    newPerson.save()
    .then(res => res.toJSON())
    .then(response => {
        console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`);
        res.json(response)
    })
    .catch(err => next(err))
})
//PUT
app.put("/api/persons/:id", (req, res, next) => {
    const body = req.body;
    const namePerson = body.name;
    const numberPerson = body.number;
    const id = req.params.id;

    const person = {
        name: namePerson,
        number: numberPerson,
    }
    
    Person.findByIdAndUpdate(id, person, { new: true })
    .then(result => {
        res.json(result)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "Unknown Endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === "CastError") {
        return response.status(400).send({ error: "Invalid id format" })
    }
    if(error.name === "ValidationError"){
        return response.status(400).send({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)
app.listen(process.env.PORT, () => {
    console.log(`The server running on port ${process.env.PORT}`);
})