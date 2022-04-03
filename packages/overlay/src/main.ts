import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import  overlay from './lib/overlay';
import FloatingVue from 'floating-vue'
// import 'virtual:windi.css'

import 'floating-vue/dist/style.css'

const app = createApp(App)

app.use(overlay);
app.use(FloatingVue);

app.use(router)

app.mount('#app')
