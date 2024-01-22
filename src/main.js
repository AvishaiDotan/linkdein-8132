import { createApp } from 'vue'
import router from './routes/main';
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import './style.scss'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'





const app = createApp(App)
for (const [key, c] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, c)
  }
app.use(ElementPlus)
app.use(router)



app.mount('#app')
