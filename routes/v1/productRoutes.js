const { Router } = require('express');
const express = require('express');
const productsController = require('../../controller/product.controller');

const router = express.Router()

router.route("/")
    .get(productsController.getAllProducts)
    .post(productsController.saveProduct)

router
    .route('/:id')
    .patch(productsController.updateProduct)
    .delete(productsController.deleteProduct)



module.exports = router;