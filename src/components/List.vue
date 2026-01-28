<script lang="ts">
import type { PropType } from 'vue';
import type { Todo } from '../types.ts';

export default {
  emits: ['deleteTodo', 'toggleTodo'],
  props: {
    todos: { type: Array as PropType<Todo[]>, required: true }
  },
  methods: {
    deleteTodo(id: Todo['id']) {
      this.$emit('deleteTodo', id);
    },
    toggleTodo(todo: Todo) {
      this.$emit('toggleTodo', todo);
    }
  }
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
