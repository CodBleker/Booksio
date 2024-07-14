import './assets/css/satoshi.css'
import './assets/css/style.css'
import 'jsvectormap/dist/css/jsvectormap.min.css'
import 'flatpickr/dist/flatpickr.min.css'

/**
 * Creación de la aplicación Vue principal.
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()) // Instalación de Pinia para el estado global de la aplicación
app.use(router) // Instalación de Vue Router para la navegación en la aplicación
app.use(VueApexCharts) // Instalación de Vue3 ApexCharts para gráficos en la aplicación

app.mount('#app') // Montaje del app en el DOM
