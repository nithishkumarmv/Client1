
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const baseURL = process.env.BASE_URL || 'http://192.168.1.34:5000';

dotenv.config();
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on http://${process.env.BASE_URL ? process.env.BASE_URL.replace(/^https?:\/\//, '') : '192.168.1.5'}:${PORT}`);
        });
    })
    .catch((err) => console.log(err));
