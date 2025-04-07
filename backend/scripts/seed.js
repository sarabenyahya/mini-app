const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../config/db');
const EmployeeModel = require('../models/Employee');

// Sample employee data
const employees = [
    { nom: 'Maram', mail: 'maram@test.com', age: 20, password: 'test123', genre: 'femme', interets: ['musique'] },
    { nom: 'Assia', mail: 'assia@test.com', age: 25, password: 'test123', genre: 'femme', interets: ['sport'] },
    { nom: 'Yassine', mail: 'yassine@test.com', age: 30, password: 'test123', genre: 'homme', interets: ['sport', 'technologie'] },
    { nom: 'Omar', mail: 'omar@test.com', age: 28, password: 'test123', genre: 'homme', interets: ['lecture'] },
    { nom: 'Sami', mail: 'sami@test.com', age: 22, password: 'test123', genre: 'homme', interets: ['cinéma', 'voyage'] }
];

const seedDatabase = async () => {
    try {
        // Connect to DB
        await connectDB();
        
        // Delete all existing employees
        await EmployeeModel.deleteAllEmployees();

        // Insert the sample employees into the database
        await EmployeeModel.addManyEmployees(employees);

        console.log('✅ Data seeded successfully');
        mongoose.disconnect();
    } catch (error) {
        console.error('❌ Error seeding the database:', error.message);
        mongoose.disconnect();
    }
};

seedDatabase();
