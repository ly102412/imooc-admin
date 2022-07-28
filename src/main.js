import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 倒入全局样式
import './styles/index.scss'
// 导入 svg
import installIcons from '@/icons'
import './permission'

const app = createApp(App)
installIcons(app)
installElementPlus(app)
app.use(store).use(router).mount('#app')
