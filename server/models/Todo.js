const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  id : {type:Number,required : true},
  content: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model("Todo", todoSchema);