<template>
  <div>
    <h1>Liste des employés</h1>


    <Table :tableData="tableData" @onDelete="handleDelete" @onEdit="handleEdit" />
  </div>
</template>

<script>
import { useEmployeeStore } from '../stores/employeeStore';
import Table from '../components/Table.vue';
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@/stores/userStore';

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Table,
  },
  computed: {
    ...mapState(useEmployeeStore, [
      'employees',


    ]),
    ...mapState(useUserStore, ['currentUser', 'isAuthenticated']),

    tableData() {
      if (!this.employees || this.employees.length === 0) {
        console.log('employees:', this.employees);
        return { headers: [], data: [] };
      }

      const headers = [
        { label: "Nom", value: "nom" },
        { label: "E - mail", value: "mail" },
        { label: "Age", value: "age" },
        { label: "Genre", value: "genre" },
        { label: "Loisir", value: "interets" },

      ];

      const data = this.employees.map(emp => {
        const row = {};
        headers.forEach(header => {
          row[header.value] = Object.prototype.hasOwnProperty.call(emp, header.value) ? emp[header.value] : '---';
        });
        return row;
      });

      return { headers, data, showActions: this.isAuthenticated };
    }
  },
  async mounted() {
    try {
      await this.fetchAllEmployees();
    } catch (error) {

      console.error("Failed to fetch employees:", error);
    }
  }
  ,
  methods: {
    ...mapActions(useEmployeeStore, [
      'fetchAllEmployees',
      'addEmployee',
      'deleteEmployee',
      'editEmployee',
    ]),

    handleEdit(id) {
      this.$router.push({ name: 'editForm', params: { id } });
    },
    handleDelete(id) {
      if (
        confirm(
          "Voulez-vous vraiment supprimer cet employé ayant l'ID: " + id + ' ?'
        )
      ) {
        this.deleteEmployee(id);
      }
    },
  },
};
</script>
