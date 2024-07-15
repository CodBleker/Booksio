<!-- PriceInput.vue -->
<template>
  <div>
    <label class="mb-2.5 block font-medium text-black dark:text-white">Precio</label>

    <input
      name="price"
      id="price"
      type="text"
      placeholder="Ingresa el precio del libro"
      v-model="formState.price"
      @input="updatePrice($event.target.value)"
      class="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
    />
    <p>Valor Formateado: {{ formattedPrice }}</p>
  </div>
</template>

<script setup>
import { watch, ref, defineEmits } from 'vue'
import { useFormStore } from '@/stores/useFormStore'

const { formState } = useFormStore()
const emits = defineEmits(['update:modelValue'])

const formattedPrice = ref('')

watch(
  () => formState.price,
  (newValue) => {
    formattedPrice.value = formatPrice(newValue)
    // Emitir el evento actualizado al padre
    emits('update:modelValue', formattedPrice.value)
  }
)

function updatePrice(value) {
  // Actualizar el estado interno
  formState.price = value
}
function formatPrice(price) {
  if (!price) return ''

  // Remover caracteres no numéricos
  price = price.replace(/[^\d.]/g, '')

  // Separar parte entera y decimal
  let parts = price.split('.')
  let integerPart = parts[0]
  let decimalPart = parts.length > 1 ? parts[1] : ''

  // Aplicar apostrofe solo al inicio para números grandes
  if (integerPart.length > 6) {
    integerPart = insertApostrophe(integerPart)
  } else {
    integerPart = insertCommas(integerPart)
  }

  // Insertar coma después de los primeros 3 dígitos en la parte decimal
  if (decimalPart.length > 3) {
    decimalPart = decimalPart.substring(0, 3) + ',' + decimalPart.substring(3)
  }

  // Limitar la parte decimal a dos dígitos
  decimalPart = decimalPart.substring(0, 2).padEnd(2, '0')

  // Unir parte entera y decimal
  price = `${integerPart}.${decimalPart}`

  return price
}

function insertApostrophe(number) {
  // Insertar apostrofe solo al inicio
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, "'")
}

function insertCommas(number) {
  // Insertar comas para separar miles
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
</script>
