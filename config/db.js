const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

const connectDB = async () => {
  if (db) {
    return db;
  }
  
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db();
    console.log('MongoDB connected successfully');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
