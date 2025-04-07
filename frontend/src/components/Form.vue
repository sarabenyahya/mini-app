<template>
  <form class="form-container">
    <div v-for="(input, index) in fields" :key="index" class="form-group">
      <label :for="input.name" class="form-label">{{ input.label }}</label>
      <input v-if="['text', 'email', 'number', 'password'].includes(input.type)" :type="input.type" :id="input.name"
        v-model="formData[input.name]" :placeholder="input.placeholder" class="form-input" />

      <div v-else-if="input.type === 'radio'" class="radio-container">
        <label v-for="option in input.options" :key="option.value" class="radio-label">
          <div class="radio-wrapper">
            <input type="radio" :name="input.name" :value="option.value" v-model="formData[input.name]"
              class="radio-input" />
            <span class="radio-custom"></span>
          </div>
          <span class="option-text">{{ option.label }}</span>
        </label>
      </div>

      <div v-else-if="input.type === 'checkbox'" class="checkbox-container">
        <label v-for="option in input.options" :key="option.value" class="checkbox-label">
          <div class="checkbox-wrapper">
            <input type="checkbox" :name="input.name" :value="option.value" v-model="formData[input.name]"
              class="checkbox-input" />
            <span class="checkbox-custom"></span>
          </div>
          <span class="option-text">{{ option.label }}</span>
        </label>
      </div>
    </div>
    <button type="button" @click="submitForm" class="submit-button">
      {{ buttonText }}
    </button>
  </form>
</template>

<script>
export default {
  name: 'FormBase',
  props: {
    fields: Array,
    buttonText: String,
    initialValues: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  created() {
    this.fields.forEach((field) => {
      if (field.type === 'checkbox') {
        this.formData[field.name] = [];
      } else {
        this.formData[field.name] = '';
      }
    });

    // Then override with initial values if provided
    if (this.initialValues && Object.keys(this.initialValues).length > 0) {
      this.formData = { ...this.formData, ...this.initialValues };
    }
  },

  methods: {
    submitForm() {
      this.$emit('onSubmit', this.formData);
    },
  },
};
</script>
