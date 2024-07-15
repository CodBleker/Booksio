<script setup>
import { watch } from 'vue'
import { useFormStore } from '@/stores/useFormStore'

const formStore = useFormStore()
const { formState } = formStore

watch(
  () => formState.price,
  (newValue) => {
    formState.price = formatPrice(newValue)
    console.log('Precio formateado:', formState.price)
  }
)

function formatPrice(price) {
  if (!price) return ''

  // Convertir a número y redondear a 2 decimales
  let num = parseFloat(price).toFixed(2)

  // Separar por miles
  num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // Agregar '.00' si no hay decimales
  if (num.indexOf('.') === -1) {
    num += '.00'
  }

  // Apóstrofo para números grandes
  if (num.length > 6) {
    num = num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1'")
  }

  return num
}
</script>

<template>
  <input
    name="price"
    id="price"
    type="text"
    placeholder="Ingresa el precio del libro"
    v-model="formState.price"
  />
</template>
