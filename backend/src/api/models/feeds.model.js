var mongoose = require('mongoose')
var Schema = mongoose.Schema

const feedSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: new Date()
  },
  dateAsString: {
    type: String
  },
  edited: {
    type: Boolean,
    default: false,
  }
})

var Feed = mongoose.model('Feed', feedSchema)
module.exports = Feed