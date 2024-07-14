import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Definición de la tienda de estado para la barra lateral
 *
 * Esta tienda gestiona el estado de la barra lateral, incluyendo si está abierta o cerrada,
 * la opción seleccionada y la página actual.
 */
export const useSidebarStore = defineStore('sidebar', () => {
  // Estado reactivo para controlar si la barra lateral está abierta o cerrada
  const isSidebarOpen = ref(false)

  // Estado persistente para almacenar el elemento seleccionado usando localStorage
  const selected = useStorage('selected', ref('eCommerce')) // 'selected' almacena la opción seleccionada (por defecto 'eCommerce')

  // Estado persistente para almacenar la página actual usando almacenamiento local
  const page = useStorage('page', ref('Dashboard')) // 'page' almacena la página actual (por defecto 'Dashboard')

  /**
   * Función para alternar el estado de la barra lateral (abrir/cerrar)
   * @returns {void} // Realiza acciones pero no produce un valor de retorno
   */
  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  // Retornar el estado y las funciones para ser utilizados en los componentes Vue
  return { isSidebarOpen, toggleSidebar, selected, page }
})
