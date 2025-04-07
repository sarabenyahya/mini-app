import apiClient from '@/api'
import { push } from 'notivue'

export const employeeService = {
  async getAllEmployees() {
    try {
      const response = await apiClient.get('/employees')

      return response.data
    } catch (error) {
      throw handleApiError(error, 'Impossible de récupérer les employés')
    }
  },

  async getEmployeeById(id) {
    try {
      const response = await apiClient.get(`/employees/${id}`)

      return response.data
    } catch (error) {
      throw handleApiError(error, `Impossible de récupérer l'employé #${id}`)
    }
  },

  async addEmployee(employeeData) {
    try {
      const response = await apiClient.post('/employees', employeeData)
      return response.data
    } catch (error) {
      throw handleApiError(error, "Impossible de créer l'employé")
    }
  },

  async updateEmployee(id, employeeData) {
    try {
      const response = await apiClient.put(`/employees/${id}`, employeeData)
      return response.data
    } catch (error) {
      throw handleApiError(error, `Impossible de mettre à jour l'employé #${id}`)
    }
  },

  async deleteEmployee(id) {
    try {
      const response = await apiClient.delete(`/employees/${id}`)
      return response.data
    } catch (error) {
      throw handleApiError(error, `Impossible de supprimer l'employé #${id}`)
    }
  },
}

// Helper function to handle API errors
function handleApiError(error, defaultMessage) {
  if (error.response && error.response.data && error.response.data.message) {
    push.error({ title: error.response.data.message, type: 'error' })
    return new Error(error.response.data.message)
  }

  if (error.message) {
    push.error({ title: error.message, type: 'error' })
    return new Error(error.message)
  }
  push.error({ title: defaultMessage, type: 'error' })
  return new Error(defaultMessage)
}

export default employeeService
