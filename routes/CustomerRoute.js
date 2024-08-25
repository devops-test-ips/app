const express = require('express');
const router = express.Router();
const customerController = require('../controller/CustomerController');

router.post('/create', customerController.create);// http://localhost:3000/customer
router.get('/find/:id', customerController.findOneById);
router.delete('/delete/:id', customerController.deleteOneById);
router.put('/update/:id', customerController.updateById);
router.get('/search', customerController.search);
module.exports = router;