import { createApp } from 'vue'
import App from './App.vue'
// import "regenerator-runtime/runtime.js";
import TodayUI  from 'today-ui';
const app = createApp(App)

app.use(TodayUI);

app.mount('#app')
