<script lang="ts">
import Panel from '@/components/Panel.vue';
import List from '@/components/List.vue';
import type { Todo } from './types.ts';

export default {
  components: {
    List,
    Panel
  },
  data() {
    return {
      loading: true,
      todos: [] as Todo[]
    };
  },
  async beforeMount() {
    this.todos = await fetch('/api/todos').then((res) => res.json());
    this.loading = false;
  },
  methods: {
    async addTodo(todo: Omit<Todo, 'id' | 'checked'>) {
      await fetch('/api/todo', { method: 'POST', body: JSON.stringify(todo) }).then((res) =>
        res.json().then((todo) => this.todos.push(todo))
      );
    },
    async deleteTodo(id: Todo['id']) {
      await fetch(`/api/todo/${id}`, { method: 'DELETE' }).then(
        () => (this.todos = this.todos.filter((item) => item.id !== id))
      );
    },
    async toggleTodo(todo: Todo) {
      const res = await fetch('/api/todo', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: todo.id, checked: !todo.checked })
      });

      const updated: Todo = await res.json();

      const index = this.todos.findIndex((item) => item.id === updated.id);
      if (index !== -1) {
        this.todos[index] = updated;
      }
    }
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
