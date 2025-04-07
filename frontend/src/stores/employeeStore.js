import { defineStore } from 'pinia'
import { push } from 'notivue'
import employeeService from '@/services/employeeService'

export const useEmployeeStore = defineStore('Employee_Store', {
  state: () => ({
    employees: [],
    isLoading: false,
  }),

  actions: {
    async fetchAllEmployees() {
      try {
        this.isLoading = true
        const data = await employeeService.getAllEmployees()

        this.employees = data
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        push.error({
          title: 'Opération echouée',
          message: 'Une erreur s’est produite lors de la recherche des employés',
        })
      }
    },
  },

  async addEmployee(employee) {
    try {
      const response = await employeeService.addEmployee(employee)
      push.success({
        title: 'Opération réussie',
        message: 'Employé ajouté avec succés',
      })
      this.employees.push(response.data)
    } catch (error) {
      push.error({
        title: 'Opération echouée',
        message: 'Une erreur s’est produite lors de l’ajout de l’employé',
      })
    }
  },
  async editEmployee(id, updatedEmployee) {
    try {
      const response = await employeeService.updateEmployee(id, updatedEmployee)
      const index = this.employees.findIndex((employee) => employee.id === id)
      if (index !== -1) {
        this.employees[index] = response.data
      }
    } catch (error) {
      push.error({
        title: 'Opération echouée',
        message: 'Une erreur s’est produite lors de la mise à jour de l’employé',
      })
    }
  },
  async deleteEmployee(id) {
    try {
      await employeeService.deleteEmployee(id)
      this.employees = this.employees.filter((employee) => employee.id !== id)
    } catch (error) {
      push.error({
        title: 'Opération echouée',
        message: 'Une erreur s’est produite lors de la suppression de l’employé',
      })
    }
  },
})
