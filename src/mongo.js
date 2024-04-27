const mongoose = require("mongoose")
const { Schema } = mongoose;

if(process.argv.length < 3){
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2]

const url =
    `mongodb+srv://test1234:${password}@cluster0.14men7r.mongodb.net/`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new Schema({
    name: String,
    number: String,
})

const Person = mongoose.model("Person", phonebookSchema)

let name = process.argv[3]
let number = process.argv[4]
console.log(number)

const person = new Person({
    name: name,
    number: number,
})



if(process.argv.length < 4){
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);
        })
        mongoose.connection.close()
})
}else{
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`, result);
        mongoose.connection.close()
    })
}