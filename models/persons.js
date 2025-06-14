/* eslint-disable no-undef */
(() => {
  const mongoose = require("mongoose");
  const { Schema } = mongoose;
  const url = process.env.MONGODB_URI;
  if(!url) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    process.exit(1)
  }
  mongoose.set("strictQuery", false);
  console.log("connecting to", url);

  mongoose
    .connect(url)
    .then(() => {
      console.log("connected to mongoDB");
    })
    .catch((error) => {
      console.log("error connecting to mongoDB", error.message);
    });

  const personSchema = new Schema({
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    number: {
      type: String,
      minLength: 8,
      required: [true, "User phone number required"],
    },
  });

  personSchema.set("toJSON", {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });
  module.exports = mongoose.model("Person", personSchema);
})();
