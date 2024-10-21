const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const User = require('../models/users');

// Добавление товара в корзину
router.post('/cart', async (req, res) => {
  const { userId, productId, quantity, price } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    // Добавляем товар в корзину
    cart.items.push({ productId, quantity, price });
    cart.calculateTotalPrice();
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при добавлении товара в корзину' });
  }
});

// Удаление товара из корзины
router.delete('/cart/:id', async (req, res) => {
  const { id } = req.params; // id товара

  try {
    const cart = await Cart.findOne({ userId: req.body.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Корзина не найдена' });
    }

    // Удаляем товар из корзины
    cart.items = cart.items.filter(item => item.productId !== id);
    cart.calculateTotalPrice();
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении товара из корзины' });
  }
});

// Получение содержимого корзины
router.get('/cart', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.body.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Корзина не найдена' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении содержимого корзины' });
  }
});

module.exports = router;
