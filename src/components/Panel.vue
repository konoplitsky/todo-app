<script lang="ts">
export default {
  emits: ['addTodo'],
  data() {
    return {
      todo: {
        title: '',
        description: ''
      }
    };
  },
  methods: {
    onSubmit() {
      this.$emit('addTodo', this.todo);
      this.formReset();
    },
    formReset() {
      this.todo.title = '';
      this.todo.description = '';
    }
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="todo.title" />
    <input type="text" v-model="todo.description" />
    <button type="submit">Создать</button>
  </form>
</template>

<style scoped>
.checked {
  text-decoration: line-through;
}
</style>
