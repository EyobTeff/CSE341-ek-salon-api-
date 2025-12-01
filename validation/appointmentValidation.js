const { body } = require('express-validator');

const validateAppointment = [
  body('customerId')
    .trim()
    .notEmpty().withMessage('Customer ID is required')
    .isMongoId().withMessage('Must be a valid customer ID'),
  body('barberId')
    .trim()
    .notEmpty().withMessage('Barber ID is required')
    .isMongoId().withMessage('Must be a valid barber ID'),
  body('serviceId')
    .trim()
    .notEmpty().withMessage('Service ID is required')
    .isMongoId().withMessage('Must be a valid service ID'),
  body('appointmentDate')
    .notEmpty().withMessage('Appointment date is required')
    .isISO8601().withMessage('Must be a valid date'),
  body('status')
    .optional()
    .isIn(['scheduled', 'completed', 'cancelled', 'no-show'])
    .withMessage('Status must be one of: scheduled, completed, cancelled, no-show'),
  body('notes')
    .optional()
    .trim()
];

module.exports = { validateAppointment };
