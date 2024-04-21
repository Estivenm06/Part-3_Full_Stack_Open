const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

var persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }

]
app.use(express.json())
app.use(cors())
//MORGAN
morgan.token("data", (req, res) => {
    const { body } = req;
    return JSON.stringify(body)
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))
//GET ALL
app.get("/api/persons", (req, res) => {
    res.send(persons)
})
//GET INFO
app.get("/info", (req, res) => {
    const personsInPhonebook = Number(persons.length)
    const currentDate = new Date()
    res.send(`<p>Phonebook has info for ${personsInPhonebook} people<p/><p>${currentDate}<p/>`)
    //console.log(Number(persons.length));
})
//GET JUST ONE
app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(e => e.id === id)
    if(person){
        res.send(person)
    }else{
        res.status(404).end()
    }
})
//DELETE
app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(e => e.id !== id)
    res.status(204).end()
})
//POST
app.post("/api/persons", (req, res) => {
    const {body} = req
    //console.log({body});
    if(!body.name || !body.number){
        res.status(400).json({
            error: "content missing"
        })
    }
    if(persons.find(e => e.name === body.name)){
        res.status(406).json({
            error: "name must be unique"
        })
    }
    const note = {
        name: body.name,
        number: body.number,
        id: persons.length + 1
    }
    res.json(note)
    persons = persons.concat(note)
})

const PORT =process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`The server running on port ${PORT}`);
})



