const express = require('express');
const Product = require('../models/ProductModels');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Путь к директории uploads
const uploadsDir = path.join(__dirname, '../uploads');

// Создание директории uploads, если она не существует
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Конфигурация хранилища Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const safeName = file.originalname.replace(/\s+/g, '-'); 
        cb(null, `${Date.now()}-${safeName}`);
    },
});

// Фильтр для загрузки только изображений
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format'), false);
    }
};

const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Ограничение на размер файла (5MB)
});

// Получение всех товаров
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Ошибка при получении товаров', error });
    }
});

// Создание нового товара
router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { name, category, rating, price, stock, description } = req.body;

        if (!name || !category || !price || !description) {
            return res.status(400).json({ message: 'Все обязательные поля должны быть заполнены.' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Необходимо загрузить изображение.' });
        }

        const product = new Product({
            name,
            category,
            rating: rating ? Number(rating) : 0,
            price: Number(price),
            stock: stock ? Number(stock) : 0,
            description,
            image: req.file.path,
        });

        await product.save();
        res.status(201).json({ message: 'Товар успешно добавлен', product });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Ошибка при добавлении товара', error });
    }
});

// Обновление товара
router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, category, rating, price, stock, description } = req.body;
        const updatedProduct = {
            name,
            category,
            rating: rating ? Number(rating) : 0,
            price: Number(price),
            stock: stock ? Number(stock) : 0,
            description,
        };

        if (req.file) {
            updatedProduct.image = req.file.path;
        }

        const product = await Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        res.status(200).json({ message: 'Товар успешно обновлен', product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Ошибка при обновлении товара', error });
    }
});

// Удаление товара
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        res.status(200).json({ message: 'Товар успешно удален' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Ошибка при удалении товара', error });
    }
});

module.exports = router;
