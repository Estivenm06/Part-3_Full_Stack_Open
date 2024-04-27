const mongoose = require("mongoose")
const { Schema } = mongoose
const url = process.env.MONGODB_URI
mongoose.set("strictQuery", false)
console.log("connecting to", url);

mongoose.connect(url)
.then(response =>{
    console.log("connected to mongoDB");
})
.catch(error => {
    console.log("error connecting to mongoDB", error.message);
})

const personSchema = new Schema({
    name: String,
    number: String,
})

personSchema.set("toJSON", {
    transform: function(doc, ret){
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
})


module.exports = mongoose.model("Person", personSchema)