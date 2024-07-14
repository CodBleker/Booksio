import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

/**
 * Definición de la tienda de estado para el modo oscuro
 *
 * Esta tienda gestiona el estado del modo oscuro de la aplicación,
 * incluyendo si está activado o desactivado.
 */
export const useDarkModeStore = defineStore('darkMode', () => {
  // Estado persistente para controlar si el modo oscuro está activado usando localStorage
  const darkMode = useStorage('darkMode', ref(false))

  // Aplicar el modo oscuro al elemento raíz del documento HTML
  document.documentElement.classList.toggle('dark', darkMode.value)

  /**
   * Función para alternar el estado del modo oscuro.
   *
   * Cambia el valor de `darkMode` y aplica los cambios al documento HTML.
   * @returns {void} // Realiza acciones pero no produce un valor de retorno
   */
  function toggleDarkMode() {
    darkMode.value = !darkMode.value
    document.documentElement.classList.toggle('dark', darkMode.value)
  }

  return { darkMode, toggleDarkMode }
})
