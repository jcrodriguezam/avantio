var mongoose = require('mongoose')
var Schema = mongoose.Schema

function getDateAsString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);

  return `${year}${month}${day}`
}

const feedSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  source: {
    type: String,
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
    type: String,
    default: getDateAsString(),
  },
  edited: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
})

var Feed = mongoose.model('Feed', feedSchema)
module.exports = Feed