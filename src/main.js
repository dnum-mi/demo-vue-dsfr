import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueDsfr from '@laruiss/vue-dsfr'

import '@laruiss/vue-dsfr/dist/vue-dsfr-fonts.css'
import '@laruiss/vue-dsfr/dist/vue-dsfr.css'

createApp(App)
  .use(router)
  .use(VueDsfr)
  .mount('#app')
