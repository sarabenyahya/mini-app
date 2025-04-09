<!-- eslint-disable vue/no-reserved-component-names -->
<template>
  <div class="form-view-container">
    <Loading v-if="isLoading" />

    <h2 class="page-title">Connexion</h2>

    <Form :fields="fieldList" :buttonText="'Se connecter'" @onSubmit="handleLogin" />

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore'
import { mapActions, mapState } from 'pinia'
import Form from '@/components/Form.vue'
import Loading from '@/components/Loading.vue'

export default {
  name: 'LoginFormView',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Loading,
  },
  data() {
    return {
      fieldList: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Entrez votre email',
          label: 'Email',
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Entrez votre mot de passe',
          label: 'Mot de passe',
        },
      ],
      errorMessage: '',
    }
  },
  computed: {
    ...mapState(useUserStore, ['isLoading']),
  },
  methods: {
    ...mapActions(useUserStore, ['login']),
    async handleLogin(data) {
      try {
        const { email, password } = data;
        await this.login(email, password);
        this.$router.push({ name: 'users' }) // Redirection après la connexion réussie
      } catch (error) {

        this.errorMessage = error.message || 'Une erreur est survenue. Veuillez vérifier vos informations.'
      }
    },
  },
}
</script>
