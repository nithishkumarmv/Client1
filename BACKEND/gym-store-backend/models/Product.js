const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  category: String,
  price: Number,
  description: String,
  image: String, // image URL from Cloudinary
  stock: Number
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
