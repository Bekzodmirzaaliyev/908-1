const express = require('express');
const mongoose = require('mongoose');
const productRouter = require('./routes/productRoute'); // Подключаем маршруты
const path = require('path');

const app = express();

// Подключаем MongoDB
const mongoURI = 'mongodb+srv://Abdulloh:634571@cluster0.76u0c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB connection error:', err));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Подключаем маршруты для продуктов
app.use('/api/v1/products', productRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
