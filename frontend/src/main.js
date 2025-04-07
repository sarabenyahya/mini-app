import './assets/main.css'

import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createNotivue } from 'notivue'

import 'notivue/notification.css'
import 'notivue/animations.css'

const app = createApp(App)
const notivue = createNotivue({
  position: 'top-right',
  limit: 4,
  enqueue: true,
  avoidDuplicates: true,
  notifications: {
    global: {
      duration: 3000,
    },
  },
})

app.use(router)
app.use(notivue)
app.use(createPinia())
app.mount('#app')
