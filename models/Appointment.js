// Appointment Model Schema
// Fields: customerId, barberId, serviceId, appointmentDate, status, notes

const appointmentSchema = {
  customerId: { type: String, required: true },
  barberId: { type: String, required: true },
  serviceId: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

module.exports = appointmentSchema;
