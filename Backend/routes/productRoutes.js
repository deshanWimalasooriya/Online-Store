const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


// Specific routes MUST come before dynamic routes
router.get('/hot-deals', productController.getHotDeals);
router.get('/new-tech', productController.getNewTech);

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);



module.exports = router;
