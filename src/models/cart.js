const mongoose = require('mongoose');
const { Schema } = mongoose;

// Создаем схему для корзины
const cartSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalPrice: { type: Number, required: true, default: 0 },
}, { timestamps: true });

// Метод для пересчета общей стоимости корзины
cartSchema.methods.calculateTotalPrice = function() {
  this.totalPrice = this.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
