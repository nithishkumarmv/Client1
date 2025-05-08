const express = require('express');
const { addProduct, getAllProducts } = require('../controllers/productController');
const router = express.Router();

router.post('/add', addProduct); // for admin
router.get('/', getAllProducts);



const upload = require('../middleware/upload');
router.post('/upload', upload.single('image'), (req, res) => {
    res.json({ imageUrl: req.file.path });
  });
  
module.exports = router;
