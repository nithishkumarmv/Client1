const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  const { userId, items, totalAmount, shippingAddress } = req.body;
  try {
    const newOrder = await Order.create({ userId, items, totalAmount, shippingAddress });
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order' });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id }).populate('items.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
