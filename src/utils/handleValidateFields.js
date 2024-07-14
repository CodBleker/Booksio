// Función para validar los campos y devolver los campos vacíos encontrados
export const handleValidateFields = (formState, fieldsToValidate) => {
  const emptyFields = []

  // Iterar sobre los campos a validar
  fieldsToValidate.forEach((field) => {
    if (!formState[field]) {
      // Verificar si el campo está vacío
      // Agregar el nombre del campo vacío al array
      emptyFields.push(field.charAt(0).toUpperCase() + field.slice(1))
    }
  })

  return emptyFields
}
