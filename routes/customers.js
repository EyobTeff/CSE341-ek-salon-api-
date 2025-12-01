const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController');
const { validateCustomer } = require('../validation/customerValidation');

// #swagger.tags = ['Customers']
router.get('/', customersController.getAllCustomers);

// #swagger.tags = ['Customers']
router.get('/:id', customersController.getCustomerById);

// #swagger.tags = ['Customers']
router.post('/', validateCustomer, customersController.createCustomer);

// #swagger.tags = ['Customers']
router.put('/:id', validateCustomer, customersController.updateCustomer);

// #swagger.tags = ['Customers']
router.delete('/:id', customersController.deleteCustomer);

module.exports = router;
