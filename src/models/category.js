const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
