const mongoose = require('mongoose');

// Define the schema for Employee
const employeeSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, 'Le nom est obligatoire'],
    },
    mail: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    genre: { type: String, required: true },
    interets: [String],
}, { timestamps: true });

// Create a model for Employee
const Employee = mongoose.model('Employee', employeeSchema);

// Expose methods to interact with the database
class EmployeeModel {
    static async getAllEmployees() {
        return await Employee.find();
    }

    static async getEmployeeById(id) {
        return await Employee.findById(id);
    }

    static async addEmployee(employeeData) {
        const newEmployee = new Employee(employeeData);
        return await newEmployee.save();
    }

    
}

module.exports = EmployeeModel;
