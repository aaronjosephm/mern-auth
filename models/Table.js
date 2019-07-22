const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const TableSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  gameType: {
    type: String,
    required: true
  },
  players: {
    type: Object,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Table = mongoose.model("tables", TableSchema);