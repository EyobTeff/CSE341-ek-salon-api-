const express = require('express');
const router = express.Router();
const barbersController = require('../controllers/barbersController');
const { validateBarber } = require('../validation/barberValidation');

/* #swagger.tags = ['Barbers']
   #swagger.responses[200] = {
     description: 'List of barbers',
     schema: [{
       _id: '692cff3cb29f0372734fd0da',
       name: 'John Smith',
       email: 'john.smith@eksalon.com',
       phone: '+1-555-0101',
       specialties: ['haircut', 'beard trim', 'shaving'],
       schedule: {
         monday: '9:00-17:00',
         tuesday: '9:00-17:00',
         wednesday: '9:00-17:00',
         thursday: '9:00-17:00',
         friday: '9:00-17:00',
         saturday: '10:00-16:00'
       },
       isActive: true,
       createdAt: '2025-11-30T08:00:00.000Z',
       updatedAt: '2025-11-30T08:00:00.000Z'
     }]
   }
*/
router.get('/', barbersController.getAllBarbers);

/* #swagger.tags = ['Barbers']
   #swagger.responses[200] = {
     description: 'Barber details',
     schema: {
       _id: '692cff3cb29f0372734fd0da',
       name: 'John Smith',
       email: 'john.smith@eksalon.com',
       phone: '+1-555-0101',
       specialties: ['haircut', 'beard trim', 'shaving'],
       schedule: {
         monday: '9:00-17:00',
         tuesday: '9:00-17:00',
         wednesday: '9:00-17:00',
         thursday: '9:00-17:00',
         friday: '9:00-17:00',
         saturday: '10:00-16:00'
       },
       isActive: true,
       createdAt: '2025-11-30T08:00:00.000Z',
       updatedAt: '2025-11-30T08:00:00.000Z'
     }
   }
*/
router.get('/:id', barbersController.getBarberById);

/* #swagger.tags = ['Barbers']
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'Barber information',
     required: true,
     schema: { $ref: '#/definitions/Barber' }
   }
*/
router.post('/', validateBarber, barbersController.createBarber);

/* #swagger.tags = ['Barbers']
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'Updated barber information',
     required: true,
     schema: { $ref: '#/definitions/Barber' }
   }
*/
router.put('/:id', validateBarber, barbersController.updateBarber);

// #swagger.tags = ['Barbers']
router.delete('/:id', barbersController.deleteBarber);

module.exports = router;
