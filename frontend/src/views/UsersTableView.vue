<template>
  <div>
    <Loading v-if="isLoading" />
    <div class="header-container">
      <h1>Liste des utilisateurs</h1>

      <RouterLink to="/users/add" v-if="currentUser?.isAdmin" class="add-button">
        <span>Ajouter un utilisateur</span>

      </RouterLink>
    </div>




    <Table :tableData="tableData" @onDelete="handleDelete" @onEdit="handleEdit" />
  </div>
</template>
<script>
import { useUserStore } from '@/stores/userStore'
import Table from '@/components/Table.vue'
import Loading from '@/components/Loading.vue'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Table,
    Loading,
  },
  computed: {
    ...mapState(useUserStore, ['users', 'isLoading', 'currentUser', 'isAdmin']),
    tableData() {
      if (!this.users || this.users.length === 0) {
        return { headers: [], data: [] }
      }

      const headers = [
        { label: "Nom", value: "lastName" },
        { label: "Prénom", value: "firstName" },
        { label: "E-mail", value: "email" },
      ]

      const data = this.users.map(user => {
        const row = {}
        headers.forEach(header => {
          row[header.value] = user[header.value] || '---'
        })
        return row
      })

      return { headers, data, showActions: this.isAdmin }
    },
  },
  async mounted() {
    try {
      await this.fetchAllUsers()
    } catch (error) {
      console.error("Failed to fetch users:", error)
    }
  },

  methods: {
    ...mapActions(useUserStore, ['deleteUser', 'fetchAllUsers']),
    handleEdit(id) {
      this.$router.push({ name: 'editForm', params: { id } })
    },
    handleDelete(id) {
      if (confirm("Voulez-vous vraiment supprimer cet utilisateur avec l'ID : " + id + ' ?')) {
        this.deleteUser(id)
      }
    },
  },
}
</script>