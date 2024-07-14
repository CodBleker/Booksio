import { createRouter, createWebHistory } from 'vue-router'

import ECommerceView from '@/views/Dashboard/ECommerceView.vue'

// Definición de las rutas disponibles en la aplicación
const routes = [
  {
    path: '/',
    name: 'Home',
    component: ECommerceView,
    meta: {
      title: 'Home'
    }
  }
]

// Creación del enrutador Vue
const router = createRouter({
  // Configuración del modo de historial basado en la historia del navegador
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // Se especifican las rutas definidas arriba
  // Comportamiento de desplazamiento al cambiar de ruta
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

// Función ejecutada antes de cada cambio de ruta
router.beforeEach((to, from, next) => {
  // Actualiza el título del documento según la meta información de la ruta actual
  document.title = `${to.meta.title} | Template Personalizado`
  next()
})

export default router
