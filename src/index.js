const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

const app = express();
app.use(express.json());

// Подключение к базе данных
connectDB();

// Подключаем маршруты
app.use('/api', authRoutes);
app.use('/api', cartRoutes);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
