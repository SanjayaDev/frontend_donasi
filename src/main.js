import { createApp } from 'vue'
import App from './App.vue'

/**
 * Import Toaster
 */
import Toast from 'vue-toastification'
import "vue-toastification/dist/index.css";

/**
 * Import Tailwind CSS
 */
import './index.css';

/**
 * Import Mixins
 */
import mixins from './mixins';

/**
 * Import Vue Router
 */
import router from './router';

/**
 * Import vuex
 */
import store from './store';

const app = createApp(App);

app.use(Toast);
app.mixin(mixins)
app.use(router);
app.use(store);
app.mount('#app');