import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import TableView from '../views/EmployeesTableView.vue'
import HomeView from '../views/HomeView.vue'
import UsersTable from '@/views/UsersTableView.vue'
import AddUserFormView from '../views/AddUserFormView.vue'
import LoginFormView from '@/views/LoginFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomeView,
    },
    {
      path: '/employees',
      name: 'employees',
      component: TableView,
      meta: { requiresAuth: true }, // Protect this route
    },
    {
      path: '/users',
      name: 'users',
      component: UsersTable,
      meta: { requiresAuth: true }, // Protect this route
    },
    {
      path: '/users/add',
      name: 'addUserForm',
      component: AddUserFormView,
      meta: { requiresAuth: true }, // Protect this route
    },
    {
      path: '/users/login',
      name: 'loginForm',
      component: LoginFormView,
    },

  ],
})


/* router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // Vérification de l'authentification au chargement de la page
  if (!userStore.isAuthenticated) {
    await userStore.checkAuth();  // Vérifie si l'utilisateur est authentifié
  }

  // Si la route nécessite l'authentification et que l'utilisateur n'est pas authentifié
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/users/login')  // Redirection vers la page de connexion
  } else {
    next()  // Accès autorisé à la route
  }

}) */

export default router
