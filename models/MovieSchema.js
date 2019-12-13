const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({ 
  name : { 
    type : String,
    required : true,
    trim : true
  },
  released_on : {
    type : String,
    required : true,
    trim : true
  }
});

module.exports = mongoose.model('Movie', MovieSchema);