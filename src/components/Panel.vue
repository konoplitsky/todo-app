<script setup lang="ts">
import { ref } from 'vue';
import { NCard, NInput, NButton, NIcon } from 'naive-ui';
import { Add } from '@vicons/ionicons5';
import type { Todo } from '@/types';

const emit = defineEmits<{ addTodo: [Omit<Todo, 'id' | 'checked'>] }>();

const todo = ref({
  title: '',
  description: ''
});

const formReset = () => {
  todo.value.title = '';
  todo.value.description = '';
};

const onSubmit = () => {
  if (!todo.value.title.trim()) return;
  emit('addTodo', { ...todo.value });
  formReset();
};
</script>

<template>
  <NCard size="small">
    <div class="panel">
      <NInput
        v-model:value="todo.title"
        placeholder="Название задачи..."
        @keyup.enter="onSubmit"
      />
      <NInput
        v-model:value="todo.description"
        placeholder="Описание"
        @keyup.enter="onSubmit"
      />
      <NButton
        type="primary"
        :disabled="!todo.title.trim()"
        @click="onSubmit"
        style="flex-shrink: 0;"
      >
        <template #icon>
          <NIcon><Add /></NIcon>
        </template>
        Добавить
      </NButton>
    </div>
  </NCard>
</template>

<style scoped>
.panel {
  display: flex;
  gap: 12px;
  align-items: center;
}

.panel > :deep(.n-input) {
  flex: 1;
}
</style>
