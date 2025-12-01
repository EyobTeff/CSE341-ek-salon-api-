const { body } = require('express-validator');

const validateService = [
  body('name')
    .trim()
    .notEmpty().withMessage('Service name is required')
    .isLength({ min: 2 }).withMessage('Service name must be at least 2 characters'),
  body('description')
    .optional()
    .trim(),
  body('duration')
    .notEmpty().withMessage('Duration is required')
    .isInt({ min: 1 }).withMessage('Duration must be a positive number in minutes'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('isActive')
    .optional()
    .isBoolean().withMessage('isActive must be a boolean')
];

module.exports = { validateService };
