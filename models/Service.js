// Service Model Schema
// Fields: name, description, duration (in minutes), price

const serviceSchema = {
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true }, // in minutes
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

module.exports = serviceSchema;
