<script setup lang="ts">
import {
  NConfigProvider,
  NGlobalStyle,
  NMessageProvider,
  NSpace,
  NH1,
  NText,
  NSpin,
  NEmpty,
  darkTheme
} from 'naive-ui';
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
  <NConfigProvider :theme="darkTheme">
    <NGlobalStyle />
    <NMessageProvider>
      <div class="app">
        <NSpace vertical size="large">
          <NH1 style="margin: 0; text-align: center;">
            <NText type="primary">📋 Список дел</NText>
          </NH1>

          <Panel @add-todo="addTodo" />

          <div v-if="loading" class="loader">
            <NSpin size="medium" />
            <NText depth="3">Загрузка задач...</NText>
          </div>
          <NEmpty v-else-if="!todos.length" description="Нет задач. Добавьте первую!" />
          <List v-else @delete-todo="deleteTodo" @toggle-todo="toggleTodo" :todos="todos" />
        </NSpace>
      </div>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style>
body {
  margin: 0;
  background: #18181c;
}

.app {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px;
}
</style>
