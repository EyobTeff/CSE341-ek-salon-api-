// Customer Model Schema
// Fields: name, email, phone, address, createdAt, updatedAt

const customerSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

module.exports = customerSchema;
