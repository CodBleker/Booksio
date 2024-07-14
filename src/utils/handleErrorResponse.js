/**
 * Maneja la respuesta de una solicitud a una API, gestionando errores comunes.
 *
 * @param {Response} response - La respuesta de la solicitud fetch.
 * @param {Function} logout - Función para cerrar sesión en caso de token inválido o expirado.
 * @returns {Promise<void>} - Promesa que se resuelve si la respuesta es exitosa, o se rechaza con un error si la respuesta es un error.
 * @throws {Error} - Error específico según el código de estado de la respuesta.
 */
export const handleErrorResponse = async (response, logout) => {
  if (response.status === 401) {
    // El token es inválido o ha expirado
    logout()
    throw new Error('Token inválido o expirado')
  }
  if (!response.ok) {
    const errorMessage = await response.text()

    // Manejo de errores según el código de estado
    switch (response.status) {
      case 400:
        throw new Error(`Solicitud incorrecta - ${errorMessage}`)
      case 404:
        throw new Error(`Recurso no encontrado - ${errorMessage}`)
      case 422:
        throw new Error(`Entidad no procesable - ${errorMessage}`)
      case 502:
        throw new Error(`Error del gateway - ${errorMessage}`)
      case 503:
        throw new Error(`Servicio no disponible - ${errorMessage}`)
      case 500:
        throw new Error(`Error del servidor - ${errorMessage}`)
      default:
        throw new Error(`Error inesperado - ${errorMessage}`)
    }
  }
}
