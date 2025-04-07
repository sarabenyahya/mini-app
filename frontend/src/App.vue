<template>
  <div class="app-container">
    <header>
      <nav class="main-nav">
        <div class="nav-brand">
          Authentification et Autorisation
        </div>
        <div class="nav-links">
          <RouterLink to="/employees" class="nav-link">Liste des employées</RouterLink>
          <RouterLink to="/users" class="nav-link">Liste des utilisateurs</RouterLink>

        </div>
        <div v-if="currentUser">
          Bienvenue <strong>{{ currentUser?.firstName }}</strong> <button @click="handleLogout"
            class="edit-button">Deconnexion</button>
        </div>
        <div v-else>
          Bienvenue <strong>visiteur</strong> <strong>{{ currentUser?.firstName }}</strong> <button @click="handleLogin"
            class="edit-button">Se connecter</button>
        </div>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>

  <Notivue v-slot="item">
    <Notification :item="item" />
  </Notivue>
</template>

<script>
import { Notivue, Notification } from 'notivue';
import { useUserStore } from './stores/userStore';
import { mapActions, mapState } from 'pinia';
import { push } from 'notivue';

export default {
  components: {
    Notivue,
    Notification,
  },
  computed: {
    ...mapState(useUserStore, ['currentUser']),
  },
  methods: {
    ...mapActions(useUserStore, ['checkAuth', 'logout']),

    async handleLogout() {
      try {
        await this.logout();
        this.$router.push({ name: 'loginForm' });
      } catch (error) {
        console.error('Failed to logout:', error);
        push.error({
          title: 'Error',
          type: 'error',
          duration: 3000,
          message: 'Failed to logout',
        })
      }
    },

    handleLogin() {
      this.$router.push({ name: 'loginForm' });
    },
  },
  async mounted() {
    await this.checkAuth();
  },
};
</script>
