const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employeeController');

router.get('/', EmployeeController.getAllEmployees);

router.get('/:id', EmployeeController.getEmployeeById);

router.post('/', EmployeeController.addEmployee);


module.exports = router;
