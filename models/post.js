const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  img:{ data: Buffer, contentType: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  type:  { type: String, required: true },
  rent: { type: Number, required: true },
  duration: {type: String, required: true },
  deposit: { type: Number, required: true },
  date: { type: Date, required: true },
  bedrooms: { type: String, required: true },
  terms: { type: String, required: true },
  baths: { type: Number, required: true },
  sqft: { type: Number, required: true },
  description: { type: String, required: true },
  ac: { type: Boolean, required: true },
  garage: { type: Boolean, required: true },
  offstreet: { type: Boolean, required: true },
  furnished: { type: Boolean, required: true },
  pool: { type: Boolean, required: true },
  laundry: { type: String, required: true },
  noPet: { type: Boolean, required: true },
  cat: { type: Boolean, required: true },
  smallDog: { type: Boolean, required: true },
  bigDog: { type: Boolean, required: true },
  ammenties: { type: String, required: true },
  userID: { type: String, required: true }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
