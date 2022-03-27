import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import  overlay from './lib/overlay';

import 'virtual:windi.css'

const app = createApp(App)

app.use(router)
app.use(overlay);

app.mount('#app')
