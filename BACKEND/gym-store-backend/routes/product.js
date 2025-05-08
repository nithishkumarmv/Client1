const express = require('express');
const { addProduct, getAllProducts } = require('../controllers/productController');
const router = express.Router();

router.post('/add', addProduct); // for admin
router.get('/', getAllProducts);

module.exports = router;
