import { createApp } from 'vue'
import App from './App.vue'

// import TodayUI  from 'today-ui';
import TTooltip from './../../today-ui/src/tooltip/';
const app = createApp(App)

// app.use(TodayUI);
app.use(TTooltip)

app.mount('#app')
