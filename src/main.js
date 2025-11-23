import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './main.css'
import 'primeicons/primeicons.css';
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'




const app = createApp(App)

app.use(router)

app.use(Toast,{
  timeout: 2000,
  position: 'top-right',
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
})

app.mount('#app')
