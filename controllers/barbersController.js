const connectDB = require('../config/db');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');

// Get all barbers
const getAllBarbers = async (req, res) => {
  try {
    console.log('getAllBarbers called');
    const db = await connectDB();
    console.log('DB connected, fetching barbers...');
    const barbers = await db.collection('barbers').find().toArray();
    console.log('Barbers fetched:', barbers.length);
    res.status(200).json(barbers);
  } catch (error) {
    console.error('Error in getAllBarbers:', error);
    res.status(500).json({ message: 'Error fetching barbers', error: error.message });
  }
};

// Get barber by ID
const getBarberById = async (req, res) => {
  try {
    const db = await connectDB();
    const barber = await db.collection('barbers').findOne({ _id: new ObjectId(req.params.id) });
    
    if (!barber) {
      return res.status(404).json({ message: 'Barber not found' });
    }
    
    res.status(200).json(barber);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching barber', error: error.message });
  }
};

// Create barber
const createBarber = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const db = await connectDB();
    const newBarber = {
      ...req.body,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('barbers').insertOne(newBarber);
    res.status(201).json({ message: 'Barber created successfully', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating barber', error: error.message });
  }
};

// Update barber
const updateBarber = async (req, res) => {
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
    
    const result = await db.collection('barbers').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Barber not found' });
    }
    
    res.status(200).json({ message: 'Barber updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating barber', error: error.message });
  }
};

// Delete barber
const deleteBarber = async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('barbers').deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Barber not found' });
    }
    
    res.status(200).json({ message: 'Barber deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting barber', error: error.message });
  }
};

module.exports = {
  getAllBarbers,
  getBarberById,
  createBarber,
  updateBarber,
  deleteBarber
};
