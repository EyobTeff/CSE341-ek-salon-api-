const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');
const { validateService } = require('../validation/serviceValidation');
const { isAuthenticated } = require('../middleware/auth');

// #swagger.tags = ['Services']
router.get('/', servicesController.getAllServices);

// #swagger.tags = ['Services']
router.get('/:id', servicesController.getServiceById);

// #swagger.tags = ['Services']
/* #swagger.parameters['body'] = {
  in: 'body',
  description: 'Service information',
  required: true,
  schema: { $ref: '#/definitions/Service' }
} */
router.post('/', isAuthenticated, validateService, servicesController.createService);

// #swagger.tags = ['Services']
/* #swagger.parameters['body'] = {
  in: 'body',
  description: 'Service information',
  required: true,
  schema: { $ref: '#/definitions/Service' }
} */
router.put('/:id', isAuthenticated, validateService, servicesController.updateService);

// #swagger.tags = ['Services']
router.delete('/:id', isAuthenticated, servicesController.deleteService);

module.exports = router;
