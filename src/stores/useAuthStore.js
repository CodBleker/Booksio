// authStore.js
import { defineStore } from 'pinia'
import { postDatosPerfil } from '../utils/api'

/**
 * Define un store para manejar la autenticación de usuarios.
 *
 * Permite realizar operaciones como iniciar sesión, cerrar sesión,
 * verificar si el usuario está autenticado y almacenar datos del usuario.
 */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    dataUserInfo: {}
  }),

  actions: {
    /**
     * Inicia sesión y guarda el token en el almacenamiento local.
     * Llama a isAuthenticated para verificar la autenticación.
     *
     * @param {string} newToken - El nuevo token de sesión.
     */
    login(newToken) {
      this.token = newToken
      localStorage.setItem('token', newToken)
      this.isAuthenticated()
    },

    /**
     * Cierra la sesión del usuario, eliminando el token y los datos de usuario.
     *
     * @returns {boolean} Verdadero si se cerró la sesión correctamente.
     */
    logout() {
      this.token = null
      this.dataUserInfo = {}
      localStorage.removeItem('token')
      return true
    },

    /**
     * Verifica si el usuario está autenticado llamando a un endpoint con el token.
     * Actualiza dataUserInfo con los datos del usuario si la autenticación es exitosa.
     * Cierra la sesión y devuelve falso si hay un error de autenticación.
     *
     * @returns {Promise<boolean|null>} Promesa que resuelve a verdadero si el usuario está autenticado, de lo contrario, falso o nulo.
     */
    async isAuthenticated() {
      const token = localStorage.getItem('token')
      if (!token) return null

      try {
        const datosPerfil = await postDatosPerfil(token)
        this.dataUserInfo = datosPerfil
        return true
      } catch (error) {
        this.logout()
        return false
      }
    }
  }
})
