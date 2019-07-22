const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  _id: Number,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  time_and_day: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Event = mongoose.model("events", EventSchema);

// event.js


// var personSchema = Schema({
//   _id     : Number,
//   name    : String,
//   age     : Number,
//   stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
// });

// var storySchema = Schema({
//   _creator : { type: Number, ref: 'Person' },
//   title    : String,
//   fans     : [{ type: Number, ref: 'Person' }]
// });