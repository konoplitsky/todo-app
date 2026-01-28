<script setup lang="ts">
import type { Todo } from '@/types.ts';

defineProps<{ todos: Todo[] }>();

const emit = defineEmits<{ deleteTodo: [number]; toggleTodo: [Todo] }>();

const deleteTodo = (id: Todo['id']) => {
  emit('deleteTodo', id);
};

const toggleTodo = (todo: Todo) => {
  emit('toggleTodo', todo);
};
</script>

<template>
  <ul v-for="todo in todos" :key="todo.id">
    <li>
      <div>
        <input type="checkbox" :checked="todo.checked" @change="toggleTodo(todo)" />
        <h2 :class="{ checked: todo.checked }">{{ todo.title }}</h2>
        <p>{{ todo.description }}</p>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.checked {
  text-decoration: line-through;
}
</style>
