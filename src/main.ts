import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
// 引入全局样式
import '@/styles/index.scss'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
