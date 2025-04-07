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

// Global navigation guard
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // If the route requires authentication and the user is not authenticated
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/users/login') // Redirect to login page
  } else {
    next() // Allow access to the route
  }
})

export default router
