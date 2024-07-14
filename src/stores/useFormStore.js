// store/useFormStore.js
import { defineStore } from 'pinia'

/**
 * Define el store para gestionar el estado del formulario.
 *
 * Este store maneja el estado del formulario, incluyendo los valores actuales
 * de los campos y métodos para actualizar y reiniciar el formulario.
 */
export const useFormStore = defineStore('form', {
  state: () => ({
    formState: {}
  }),
  actions: {
    /**
     * Actualiza el valor de un campo específico en el formulario.
     *
     * @param {string} name - Nombre del campo a actualizar.
     * @param {any} value - Nuevo valor del campo.
     */
    setFormValue(name, value) {
      this.formState[name] = value
    },

    // Reinicia el formulario, estableciendo todos los campos a su estado inicial.
    resetForm() {
      this.formState = {}
    }
  }
})
