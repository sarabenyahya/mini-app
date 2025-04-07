const Employee = require('../models/Employee');

class MongoDbService {
    static getAllEmployees() {
        return Employee.getAllEmployees();
    }

    static getEmployeeById(id) {
        return Employee.getEmployeeById(id);
    }

    static addEmployee(employee) {
        return Employee.addEmployee(employee);
    }

    
}

module.exports = MongoDbService;
