const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  address: { type: String, required: true },
  type: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now },
  userID: { type: String, required: true }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
