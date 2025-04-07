import apiClient from '@/api'
import { push } from 'notivue'

export const userService = {
  // Authentication
  async login(email, password) {
    try {
      const response = await apiClient.post('/users/login', { email, password })
      return response.data
    } catch (error) {
      throw handleApiError(error, 'Échec de la connexion')
    }
  },

  async logout() {
    try {
      const response = await apiClient.post('/users/logout')
      return response.data
    } catch (error) {
      throw handleApiError(error, 'Échec de la déconnexion')
    }
  },

  // User management - Users authenticated only
  async getAllUsers() {
    try {
      const response = await apiClient.get('/users')
      return response.data
    } catch (error) {
      throw handleApiError(error, 'Impossible de récupérer les utilisateurs')
    }
  },

  async getUserById(id) {
    try {
      const response = await apiClient.get(`/users/${id}`)
      return response.data
    } catch (error) {
      throw handleApiError(error, `Impossible de récupérer l'utilisateur #${id}`)
    }
  },

  async addUser(userData) {
    try {
      const response = await apiClient.post('/users', userData)
      return response.data
    } catch (error) {
      throw handleApiError(error, "Impossible de créer l'utilisateur")
    }
  },

  async updateUser(id, userData) {
    try {
      const response = await apiClient.put(`/users/${id}`, userData)
      return response.data
    } catch (error) {
      throw handleApiError(error, `Impossible de mettre à jour l'utilisateur #${id}`)
    }
  },

  async deleteUser(id) {
    try {
      const response = await apiClient.delete(`/users/${id}`)
      return response.data
    } catch (error) {
      throw handleApiError(error, `Impossible de supprimer l'utilisateur #${id}`)
    }
  },

  async checkSession() {
    try {
      const response = await apiClient.get('/users/check-session')
      return response.data
    } catch (error) {
      throw handleApiError(error, 'Échec de la vérification de la session')
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

export default userService
