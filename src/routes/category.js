const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Создание новой категории
router.post('/category', async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Название категории обязательно' });
  }

  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании категории', error });
  }
});

// Получение всех категорий
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении категорий', error });
  }
});

// Удаление категории
router.delete('/category/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Категория не найдена' });
    }

    res.status(200).json({ message: 'Категория удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении категории', error });
  }
});

module.exports = router;
