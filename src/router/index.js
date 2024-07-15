import { createRouter, createWebHistory } from 'vue-router'

import ListadoLibros from '@/views/Pages/ListadoLibros.vue'
import SigninView from '@/views/Authentication/SigninView.vue'
import SignUpView from '@/views/Authentication/SignUpView.vue'
import RegistrarLibro from '../views/Pages/RegistrarLibro.vue'
import RegistrarColeccion from '../views/Pages/RegistrarColeccion.vue'
import ListadoColecciones from '../views/Pages/ListadoColecciones.vue'
import Favoritos from '../views/Pages/Favoritos.vue'

// Definición de las rutas disponibles en la aplicación
const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: ListadoLibros,
    meta: {
      title: 'Inicio'
    }
  },
  {
    path: '/registro',
    name: 'Registrar',
    component: SignUpView,
    meta: {
      title: 'Registrar'
    }
  },
  {
    path: '/login',
    name: 'Iniciar sesión',
    component: SigninView,
    meta: {
      title: 'Iniciar sesión'
    }
  },
  {
    path: '/libros/registrar',
    name: 'Registrar Libro',
    component: RegistrarLibro,
    meta: {
      title: 'Registrar Libro'
    }
  },
  {
    path: '/colecciones',
    name: 'Lista de colecciones',
    component: ListadoColecciones,
    meta: {
      title: 'Lista de colecciones'
    }
  },
  {
    path: '/colecciones/registrar',
    name: 'Registrar nueva Colección',
    component: RegistrarColeccion,
    meta: {
      title: 'Registrar nueva Colección'
    }
  },
  {
    path: '/favoritos',
    name: 'Mis Favoritos',
    component: Favoritos,
    meta: {
      title: 'Mis Favoritos'
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
  document.title = `${to.meta.title} | Booksio`
  next()
})

export default router
