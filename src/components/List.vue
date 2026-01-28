<script setup lang="ts">
import { NList, NListItem, NCheckbox, NThing, NText, NButton, NIcon } from 'naive-ui';
import { TrashOutline } from '@vicons/ionicons5';
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
  <NList bordered>
    <NListItem v-for="todo in todos" :key="todo.id">
      <template #prefix>
        <NCheckbox
          :checked="todo.checked"
          @update:checked="toggleTodo(todo)"
        />
      </template>

      <NThing>
        <template #header>
          <NText :delete="todo.checked" :depth="todo.checked ? 3 : 1">
            {{ todo.title }}
          </NText>
        </template>
        <template #description v-if="todo.description">
          <NText :depth="todo.checked ? 3 : 2" style="font-size: 13px;">
            {{ todo.description }}
          </NText>
        </template>
      </NThing>

      <template #suffix>
        <NButton
          quaternary
          circle
          type="error"
          @click="deleteTodo(todo.id)"
        >
          <template #icon>
            <NIcon><TrashOutline /></NIcon>
          </template>
        </NButton>
      </template>
    </NListItem>
  </NList>
</template>
