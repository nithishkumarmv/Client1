const express = require('express');
const { placeOrder, getOrdersByUser } = require('../controllers/orderController');
const router = express.Router();

router.post('/place', placeOrder);
router.get('/user/:id', getOrdersByUser);

module.exports = router;
