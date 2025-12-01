const connectDB = require('../config/db');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const db = await connectDB();
    const customers = await db.collection('customers').find().toArray();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const db = await connectDB();
    const customer = await db.collection('customers').findOne({ _id: new ObjectId(req.params.id) });
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer', error: error.message });
  }
};

// Create customer
const createCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const db = await connectDB();
    const newCustomer = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('customers').insertOne(newCustomer);
    res.status(201).json({ message: 'Customer created successfully', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating customer', error: error.message });
  }
};

// Update customer
const updateCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const db = await connectDB();
    const updatedData = {
      ...req.body,
      updatedAt: new Date()
    };
    
    const result = await db.collection('customers').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error: error.message });
  }
};

// Delete customer
const deleteCustomer = async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('customers').deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error: error.message });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
