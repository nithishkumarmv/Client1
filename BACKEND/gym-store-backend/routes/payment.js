const express = require('express');
const razorpay = require('../utils/razorpay');
const router = express.Router();

router.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;
  const options = {
    amount: amount * 100,  // Razorpay expects amount in paisa (1 INR = 100 paisa)
    currency: currency || 'INR',  // Default to INR if not provided
    receipt: 'receipt_order_' + Date.now()  // Unique receipt ID for the order
  };

  try {
    // Create the Razorpay order
    const order = await razorpay.orders.create(options);
    res.json(order);  // Send back the order details
  } catch (err) {
    res.status(500).json({ message: 'Payment order creation failed' });
  }
});

module.exports = router;
