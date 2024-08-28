const express = require('express');
const router = express.Router();
const customerController = require('../controller/CustomerController');
const verifyToken = require('../middleware/Middleware');

router.post('/create',verifyToken, customerController.create);// http://localhost:3000/customer
router.get('/find/:id',verifyToken, customerController.findOneById);
router.delete('/delete/:id',verifyToken, customerController.deleteOneById);
router.put('/update/:id',verifyToken, customerController.updateById);
router.get('/search',verifyToken, customerController.search);
module.exports = router;