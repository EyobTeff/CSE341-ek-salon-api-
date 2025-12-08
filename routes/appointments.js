const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');
const { validateAppointment } = require('../validation/appointmentValidation');
const { isAuthenticated } = require('../middleware/auth');

/* #swagger.tags = ['Appointments']
   #swagger.responses[200] = {
     description: 'List of appointments',
     schema: [{
       _id: '692cff00b29f0372734fd0d5',
       customerId: '674b8a1234567890abcdef01',
       barberId: '674b8a1234567890abcdef02',
       serviceId: '674b8a1234567890abcdef03',
       appointmentDate: '2025-12-05T10:00:00.000Z',
       status: 'scheduled',
       notes: 'Customer prefers morning appointments',
       createdAt: '2025-11-30T08:00:00.000Z',
       updatedAt: '2025-11-30T08:00:00.000Z'
     }]
   }
*/
router.get('/', appointmentsController.getAllAppointments);

/* #swagger.tags = ['Appointments']
   #swagger.responses[200] = {
     description: 'Appointment details',
     schema: {
       _id: '692cff00b29f0372734fd0d5',
       customerId: '674b8a1234567890abcdef01',
       barberId: '674b8a1234567890abcdef02',
       serviceId: '674b8a1234567890abcdef03',
       appointmentDate: '2025-12-05T10:00:00.000Z',
       status: 'scheduled',
       notes: 'Customer prefers morning appointments',
       createdAt: '2025-11-30T08:00:00.000Z',
       updatedAt: '2025-11-30T08:00:00.000Z'
     }
   }
*/
router.get('/:id', appointmentsController.getAppointmentById);

/* #swagger.tags = ['Appointments']
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'Appointment information',
     required: true,
     schema: { $ref: '#/definitions/Appointment' }
   }
*/
router.post('/', isAuthenticated, validateAppointment, appointmentsController.createAppointment);

/* #swagger.tags = ['Appointments']
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'Updated appointment information',
     required: true,
     schema: { $ref: '#/definitions/Appointment' }
   }
*/
router.put('/:id', isAuthenticated, validateAppointment, appointmentsController.updateAppointment);

// #swagger.tags = ['Appointments']
router.delete('/:id', isAuthenticated, appointmentsController.deleteAppointment);

module.exports = router;
