// Barber Model Schema
// Fields: name, email, phone, specialties, isActive

const barberSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  specialties: { type: Array, default: [] },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

module.exports = barberSchema;
