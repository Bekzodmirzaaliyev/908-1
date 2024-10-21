const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const crm = require('./routes/crm');
const product = require('./routes/productRoute');
const app = express();
app.use(express.json());

// Подключение к базе данных
connectDB();

// Подключаем маршруты
app.use('/api', authRoutes);
app.use('/api', cartRoutes);
app.use('/api', crm);
app.use('/api', product);

app.listen('8000', () => {
    console.log('Server is running on port 8000');
});
