import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // We'll create this in a later step

const app = createApp(App)

app.use(createPinia())
app.use(router) // We'll create this in a later step

app.mount('#app')
