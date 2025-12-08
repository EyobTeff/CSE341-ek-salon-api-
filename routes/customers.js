const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController');
const { validateCustomer } = require('../validation/customerValidation');
const { isAuthenticated } = require('../middleware/auth');

// #swagger.tags = ['Customers']
router.get('/', customersController.getAllCustomers);

// #swagger.tags = ['Customers']
router.get('/:id', customersController.getCustomerById);

// #swagger.tags = ['Customers']
/* #swagger.parameters['body'] = {
  in: 'body',
  description: 'Customer information',
  required: true,
  schema: { $ref: '#/definitions/Customer' }
} */
router.post('/', isAuthenticated, validateCustomer, customersController.createCustomer);

// #swagger.tags = ['Customers']
/* #swagger.parameters['body'] = {
  in: 'body',
  description: 'Customer information',
  required: true,
  schema: { $ref: '#/definitions/Customer' }
} */
router.put('/:id', isAuthenticated, validateCustomer, customersController.updateCustomer);

// #swagger.tags = ['Customers']
router.delete('/:id', isAuthenticated, customersController.deleteCustomer);

module.exports = router;
