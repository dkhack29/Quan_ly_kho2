import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Sidebar from './components/Sidebar.vue'

const app = createApp(App)
app.component('Sidebar', Sidebar)
app.mount('#app')
