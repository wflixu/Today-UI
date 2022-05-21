import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
// import TodayUI  from 'today-ui';

const app = createApp(App)
app.use(router);
// app.use(TodayUI);

app.mount('#app')
