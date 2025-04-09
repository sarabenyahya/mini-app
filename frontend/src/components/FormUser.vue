<template>
  <form>
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

    </div>
  </form>
  <button type="button" @click="submit" class="submit-button">{{ buttonText }}</button>

</template>

<script>
export default {
  props: {
    fields: Array,
    initialValues: Object,
    buttonText: String,
  },
  data() {
    return {
      formData: { ...this.initialValues },
    };
  },
  methods: {
    submit() {
      this.$emit('onSubmit', this.formData);
    },
  },
};
</script>
