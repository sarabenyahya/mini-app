<template>
  <div class="table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="(header, index) in tableData.headers" :key="index">
            {{ header.label }}
          </th>
          <th v-if="tableData.showActions">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableData.data" :key="row.id">
          <td v-for="(cell, index) in Object.values(row)" :key="index">
            {{ cell }}
          </td>
          <td v-if="tableData.showActions">
            <div class="actions-container">
              <button class="edit-button" @click="handleEdit(row.id)">
                <span>Modifier</span>
              </button>
              <button class="delete-button" @click="handleDelete(row.id)">
                <span>Supprimer</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    tableData: {
      headers: Array,
      data: Array,
      showActions: Boolean,
    },
  },

  methods: {
    handleDelete(id) {
      this.$emit('onDelete', id);
    },
    handleEdit(id) {
      this.$emit('onEdit', id);
    },
  },
};
</script>
