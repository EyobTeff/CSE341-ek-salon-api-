const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');
const { validateService } = require('../validation/serviceValidation');

// #swagger.tags = ['Services']
router.get('/', servicesController.getAllServices);

// #swagger.tags = ['Services']
router.get('/:id', servicesController.getServiceById);

// #swagger.tags = ['Services']
router.post('/', validateService, servicesController.createService);

// #swagger.tags = ['Services']
router.put('/:id', validateService, servicesController.updateService);

// #swagger.tags = ['Services']
router.delete('/:id', servicesController.deleteService);

module.exports = router;
