const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed', error);
        throw error;
    }
};

module.exports = { connectDB };