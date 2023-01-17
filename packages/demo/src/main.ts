import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'
import './assets/main.css'
import 'today-ui/dist/style.css'
import TodayUI from 'today-ui'

async function bootstrap() {
    const app = createApp(App)
    app.use(createPinia())
    app.use(TodayUI);
    app.use(router);
    app.mount('#app')
}

bootstrap()

