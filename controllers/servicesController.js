const connectDB = require('../config/db');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');

// Get all services
const getAllServices = async (req, res) => {
  try {
    const db = await connectDB();
    const services = await db.collection('services').find().toArray();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const db = await connectDB();
    const service = await db.collection('services').findOne({ _id: new ObjectId(req.params.id) });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
};

// Create service
const createService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const db = await connectDB();
    const newService = {
      ...req.body,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('services').insertOne(newService);
    res.status(201).json({ message: 'Service created successfully', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

// Update service
const updateService = async (req, res) => {
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
    
    const result = await db.collection('services').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.status(200).json({ message: 'Service updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

// Delete service
const deleteService = async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('services').deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};
