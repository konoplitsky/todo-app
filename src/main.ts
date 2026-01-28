import { createApp } from 'vue';
import App from './App.vue';

async function enableMocking() {
  if (!import.meta.env.DEV) return;

  const { worker } = await import('./mocks/browser');

  await worker.start({
    onUnhandledRequest: 'bypass'
  });
}

await enableMocking();

createApp(App).mount('#app');
