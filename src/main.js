/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import axios from 'axios'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)

registerPlugins(app)

app.config.globalProperties.$http = axios;

app.use(Notifications)

app.mount('#app')
