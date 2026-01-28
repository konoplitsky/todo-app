<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from '@/types';

const emit = defineEmits<{ addTodo: [Omit<Todo, 'id' | 'checked'>] }>();

const todo = ref({
  title: '',
  description: ''
});

const formReset = () => {
  ((todo.value.title = ''), (todo.value.description = ''));
};

const onSubmit = () => {
  emit('addTodo', todo.value);
  formReset();
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
