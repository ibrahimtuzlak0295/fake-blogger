import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { Quasar, Dialog, Notify } from 'quasar';

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

import './assets/main.css';

const app = createApp(App);

app
  .use(router)
  .use(Quasar, {
    plugins: { Dialog, Notify },
  })
  .use(store);

app.mount('#app');
