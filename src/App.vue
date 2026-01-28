<script setup lang="ts">
import Panel from '@/components/Panel.vue';
import List from '@/components/List.vue';
import type { Todo } from '@/types.ts';
import { onMounted, ref } from 'vue';

const loading = ref<boolean>(true);
const todos = ref<Todo[]>([]);

onMounted(async () => {
  const res = await fetch('/api/todos');
  todos.value = await res.json();
  loading.value = false;
});

const addTodo = async (todo: Omit<Todo, 'id' | 'checked'>) => {
  const res = await fetch('/api/todo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  });

  const newTodo: Todo = await res.json();
  todos.value.push(newTodo);
};

const deleteTodo = async (id: Todo['id']) => {
  await fetch(`/api/todo/${id}`, { method: 'DELETE' });

  todos.value = todos.value.filter((item) => item.id !== id);
};

const toggleTodo = async (todo: Todo) => {
  const res = await fetch('/api/todo', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: todo.id, checked: !todo.checked })
  });

  const updated: Todo = await res.json();

  const index = todos.value.findIndex((item) => item.id === updated.id);
  if (index !== -1) {
    todos.value[index] = updated;
  }
};
</script>

<template>
  <h1>Список дел</h1>
  <Panel @addTodo="addTodo" />
  <h2 v-if="!todos.length">{{ loading ? 'Loafing...' : 'no tasks!!!' }}</h2>
  <List v-else @deleteTodo="deleteTodo" @toggleTodo="toggleTodo" :todos="todos" />
</template>

<style scoped></style>
