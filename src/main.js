import '@laruiss/vue-dsfr/dist/vue-dsfr-fonts.css'
import '@laruiss/vue-dsfr/dist/vue-dsfr.css'

import { createApp } from 'vue'
// import Popper from 'vue3-popper'
import VueDsfr from '@laruiss/vue-dsfr'

import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import './icons.js'

import './main.css'

createApp(App)
  .use(store)
  .use(router)
  .use(VueDsfr)
  // .component('VuePopper', Popper)
  .mount('#app')
