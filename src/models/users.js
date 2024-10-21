const mongoose = require('mongoose');
const { Schema } = mongoose;

// Создаем схему пользователя
const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthday: { type: Date, required: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  cardnumber: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
