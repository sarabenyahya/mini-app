<template>
  <div class="form-view-container">
    <h2 class="page-title">Ajouter un utilisateur</h2>
    <FormUser :fields="fieldList" :buttonText="'créér un utilisateur'" :initialValues="UserData"
      @onSubmit="handleSubmit" />
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { mapActions } from 'pinia';
import FormUser from '@/components/FormUser.vue';

export default {
  components: {

    FormUser,
  },
  props: {
    id: {
      // id=1002
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      fieldList: [
        {
          name: 'lastName',
          type: 'text',
          placeholder: 'tapez votre nom',
          label: 'Nom',
        },
        {
          name: 'firstName',
          type: 'text',
          placeholder: 'tapez votre nom',
          label: 'Prénom',
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'tapez votre adresse email',
          label: 'Email',
        },

        {
          name: 'password',
          type: 'password',
          placeholder: 'tapez votre mot de passe',
          label: 'Mot de passe',
        },
        {
          name: 'genre',
          type: 'radio',
          label: 'isAdmin?',
          options: [
            { value: 'oui', label: 'oui' },
            { value: 'Non', label: 'Non' },
          ],
        },

      ],
      UserData: {},
    };
  },



  methods: {
    ...mapActions(useUserStore, ['createUser']),
    async handleSubmit(data) {
      const userStore = useUserStore()
      try {
        await userStore.createUser(data)
        this.$router.push({ name: 'users' })
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error.message)
      }
    }
  },
};
</script>
