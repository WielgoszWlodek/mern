const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({

  userId: {
    type: String,
    
  },
 
  name: {
    type: String,
    required: true,
  
  },
  nrkarty: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
  },
  likes: {
    type: Array,
    default: [],
  },

});


module.exports = mongoose.model("User", userSchema);

// books
