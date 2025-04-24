import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from './App.vue';
import router from './router';
import { apolloClient } from './apollo';

const app = createApp(App);
const pinia = createPinia();

app
  .use(pinia)
  .use(router)
  .provide(DefaultApolloClient, apolloClient)
  .mount('#app');
