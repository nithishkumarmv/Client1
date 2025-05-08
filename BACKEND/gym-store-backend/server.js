const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Gym Store API running');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


const productRoutes = require('./routes/product');
app.use('/api/products', productRoutes);

const orderRoutes = require('./routes/order');
app.use('/api/orders', orderRoutes);


const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
