const connectDB = require('../config/db');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const db = await connectDB();
    const appointments = await db.collection('appointments').find().toArray();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const db = await connectDB();
    const appointment = await db.collection('appointments').findOne({ _id: new ObjectId(req.params.id) });
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment', error: error.message });
  }
};

// Create appointment
const createAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const db = await connectDB();
    const newAppointment = {
      ...req.body,
      status: req.body.status || 'scheduled',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('appointments').insertOne(newAppointment);
    res.status(201).json({ message: 'Appointment created successfully', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
};

// Update appointment
const updateAppointment = async (req, res) => {
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
    
    const result = await db.collection('appointments').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.status(200).json({ message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection('appointments').deleteOne({ _id: new ObjectId(req.params.id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error: error.message });
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
};
