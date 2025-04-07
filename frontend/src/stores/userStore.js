import { defineStore } from 'pinia'
import { userService } from '@/services/userService'
import { push } from 'notivue'

export const useUserStore = defineStore('User Store', {
  state: () => ({
    user: null,
    users: [],
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }),

  getters: {
    isAdmin: (state) => state.user?.isAdmin || false,
    currentUser: (state) => state.user,
    allUsers: (state) => state.users,
    hasError: (state) => !!state.error,
  },

  actions: {
    async login(email, password) {
      this.isLoading = true
      this.error = null

      try {
        const response = await userService.login(email, password)
        this.user = response.user
        this.isAuthenticated = true
        push.success({
          title: 'Félicitations',
          type: 'success',
          duration: 3000,
          message: 'Connexion réussie',
        })

        return response
      } catch (error) {
        this.error = error.message || 'Erreur de connexion'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      this.isLoading = true
      this.error = null

      try {
        await userService.logout()
        this.user = null
        this.isAuthenticated = false
        this.users = []
      } catch (error) {
        this.error = error.message || 'Erreur de déconnexion'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async fetchAllUsers() {
      if (!this.isAuthenticated) {
        this.error = 'Accès non autorisé'
        return
      }
      this.isLoading = true
      this.error = null

      try {
        const users = await userService.getAllUsers()
        this.users = users
        console.log('users: ', users)
        return users
      } catch (error) {
        this.error = error.message || 'Erreur lors de la récupération des utilisateurs'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async getUserById(id) {
      if (!this.isAuthenticated) {
        this.error = 'Accès non autorisé'
        return
      }

      this.isLoading = true
      this.error = null

      try {
        return await userService.getUserById(id)
      } catch (error) {
        this.error = error.message || `Erreur lors de la récupération de l'utilisateur #${id}`
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async createUser(userData) {
      if (!this.isAdmin) {
        this.error = 'Accès non autorisé'
        return
      }

      this.isLoading = true
      this.error = null

      try {
        const newUser = await userService.addUser(userData)
        this.users.push(newUser)
        return newUser
      } catch (error) {
        this.error = error.message || "Erreur lors de la création de l'utilisateur"
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async updateUser(id, userData) {
      if (!this.isAdmin) {
        this.error = 'Accès non autorisé'
        return
      }

      this.isLoading = true
      this.error = null

      try {
        const updatedUser = await userService.updateUser(id, userData)
        const index = this.users.findIndex((user) => user._id === id)
        if (index !== -1) {
          this.users[index] = updatedUser
        }
        return updatedUser
      } catch (error) {
        this.error = error.message || `Erreur lors de la mise à jour de l'utilisateur #${id}`
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async deleteUser(id) {
      if (!this.isAdmin) {
        this.error = 'Accès non autorisé'
        return
      }

      this.isLoading = true
      this.error = null

      try {
        await userService.deleteUser(id)
        this.users = this.users.filter((user) => user._id !== id)
        return true
      } catch (error) {
        this.error = error.message || `Erreur lors de la suppression de l'utilisateur #${id}`
        throw error
      } finally {
        this.isLoading = false
      }
    },

    resetError() {
      this.error = null
    },

    async checkAuth() {
      try {
        const { data } = await userService.checkSession()
        this.isAuthenticated = data.authenticated
        if (data.authenticated && !this.user) {
          this.user = data.user
        }
        return this.isAuthenticated
      } catch (error) {
        this.isAuthenticated = false
        return false
      }
    },
  },
})
