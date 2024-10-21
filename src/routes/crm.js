const express = require('express');
const router = express.Router();
const CRMLead = require('../models/crmLead');

// Добавление нового лида в CRM
router.post('/crm/leads', async (req, res) => {
  const { name, email, phone, orderDetails } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Поля имя, email и телефон обязательны' });
  }

  try {
    const newLead = new CRMLead({
      name,
      email,
      phone,
      orderDetails
    });

    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при добавлении лида', error });
  }
});

// Получение информации о лиде по ID
router.get('/crm/leads/:id', async (req, res) => {
  try {
    const lead = await CRMLead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Лид не найден' });
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении лида', error });
  }
});

module.exports = router;
