const Service = require('../services/MongoDbService')
const mongoose = require('mongoose');


class EmployeeController {
    static async getAllEmployees(req, res) {
        try {
            const employees = await Service.getAllEmployees();
            
            res.json(employees);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getEmployeeById(req, res) {
        const id = req.params.id;
        // Ensure the ID is valid and is an ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID non valide' });
        }

        try {
            const employee = await Service.getEmployeeById(id);
            if (!employee) {
                return res.status(404).json({ message: 'Employé non trouvé' });
            }
            res.json(employee);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async addEmployee(req, res) {
        const { nom, mail, age, password, genre, interets } = req.body;
        if (!nom || !mail || !age || !password || !genre || !interets) {
            return res.status(400).json({ message: 'Erreur: Données incomplètes' });
        }
        try {
            const newEmployee = await Service.addEmployee({ nom, mail, age, password, genre, interets });
            res.status(201).json(newEmployee);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

   

}

module.exports = EmployeeController;

