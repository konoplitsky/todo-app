import { createApp } from 'vue';
// @ts-ignore
import App from './App.vue';

async function enableMocking() {
  if (!import.meta.env.DEV) return;

  const { worker } = await import('./mocks/browser');

  await worker.start({
    onUnhandledRequest: 'bypass'
  });
}

await enableMocking();

const app = createApp(App);
app.mount('#app');
