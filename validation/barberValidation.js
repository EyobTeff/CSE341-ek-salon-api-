const { body } = require('express-validator');

const validateBarber = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone is required')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
    .withMessage('Must be a valid phone number'),
  body('specialties')
    .optional()
    .isArray().withMessage('Specialties must be an array'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean')
];

module.exports = { validateBarber };
