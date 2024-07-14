import Swal from 'sweetalert2'
import { handleErrorResponse } from './handleErrorResponse'
import { handleValidateFields } from './handleValidateFields'

export const postIniciarSesion = async (formState, fieldsToValidate, dataBody) => {
  try {
    /* Validación de los campos */
    const emptyFields = handleValidateFields(formState, fieldsToValidate)
    if (emptyFields.length > 0) throw new Error(`Campos vacíos en: ${emptyFields.join(', ')}`)
    /* Fin Validación de los campos */

    const response = await fetch('https://bookstore.mgi.pe/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataBody)
    })

    // Manejar la respuesta del servidor
    await handleErrorResponse(response, '')

    const data = await response.json()
    return data
  } catch (error) {
    // Capturar y manejar errores
    Swal.fire({
      title: 'Ooops! Ocurrió un error',
      html: 'Por favor, inténtalo de nuevo más tarde.',
      footer: `Error: ${error.message}`,
      icon: 'error',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#3C50E0'
    })
  }
}

export const postRegistrarUsuario = async (
  formState,
  resetForm,
  fieldsToValidate,
  dataBody,
  navigate
) => {
  try {
    /* Validación de los campos */
    const emptyFields = handleValidateFields(formState, fieldsToValidate)
    if (emptyFields.length > 0) throw new Error(`Campos vacíos en: ${emptyFields.join(', ')}`)
    /* Fin Validación de los campos */

    // Realizar la solicitud POST a la API
    const response = await fetch('https://bookstore.mgi.pe/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataBody)
    })

    // Manejar la respuesta del servidor
    await handleErrorResponse(response, '')

    // Mostrar mensaje de éxito utilizando SweetAlert
    Swal.fire({
      title: 'Registro exitoso!',
      text: 'Se ha registrado correctamente',
      icon: 'success',
      confirmButtonText: 'Regresar al login',
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      confirmButtonColor: '#3C50E0'
    }).then((result) => {
      if (result.isConfirmed) {
        resetForm()
        navigate()
      }
    })
  } catch (error) {
    // Capturar y manejar errores
    Swal.fire({
      title: 'Ooops! Ocurrió un error',
      html: 'Por favor, inténtalo de nuevo más tarde.',
      footer: `Error: ${error.message}`,
      icon: 'error',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#3C50E0'
    })
  }
}

export const postDatosPerfil = async (token) => {
  try {
    // Realizar una solicitud fetch para verificar la autenticación
    const response = await fetch(`https://bookstore.mgi.pe/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    await handleErrorResponse(response, '') // Manejo de errores

    const userProfile = await response.json()

    return userProfile
  } catch (error) {
    Swal.fire({
      title: 'Ooops!',
      text: error,
      icon: 'error',
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false
    })
    return false
  }
}
