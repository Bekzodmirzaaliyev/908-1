const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');

// Регистрация нового пользователя
router.post('/register', async (req, res) => {
  const { firstname, lastname, birthday, phone, gender, email, password, address, cardnumber } = req.body;

  // Простая валидация
  if (!firstname || !lastname || !birthday || !phone || !gender || !email || !password || !address || !cardnumber) {
    return res.status(400).json({ message: 'Пожалуйста, заполните все поля' });
  }

  try {
    // Проверка на существование пользователя с таким же email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя
    const newUser = new User({
      firstname,
      lastname,
      birthday,
      phone,
      gender,
      email,
      password: hashedPassword,
      address,
      cardnumber
    });

    await newUser.save();
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
