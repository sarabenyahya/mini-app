const employees = [
    { id: 100, nom: 'maram', mail: 'maram@test', age: 20, password: 'test', genre: 'femme', interets: ['musique'] },
    { id: 102, nom: 'assia', mail: 'assia@test', age: 25, password: 'test', genre: 'femme', interets: ['sport'] },
    { id: 103, nom: 'yassine', mail: 'yassine@test', age: 30, password: 'test', genre: 'homme', interets: ['sport'] },
];

let nextId = Math.max(...employees.map(emp => emp.id), 0) + 1;

class FakeService {
    static getAllEmployees() {
        return employees;
    }

    static getEmployeeById(id) {
        return employees.find(emp => emp.id === id);
    }

    static addEmployee(employee) {
        const newEmployee = { id: nextId++, ...employee };
        employees.push(newEmployee);
        return newEmployee;
    }

    
}

module.exports = FakeService;
