<script setup>
import { ref, onMounted } from 'vue'
import { getListadoColecciones } from '../utils/api'
import { useAuthStore } from '@/stores/useAuthStore'
import { defineEmits } from 'vue'

// Definimos los eventos que el componente puede emitir
const emits = defineEmits(['update:modelValue'])

// Definimos referencias reactivas para manejar el estado de la selección y la lista de datos
const selectedOption = ref('')
const isOptionSelected = ref(false)
const dataList = ref([])
const authStore = useAuthStore()

// Función asincrónica para obtener la lista de colecciones al montar el componente
const handleListCollections = async () => {
  try {
    const listaLibros = await getListadoColecciones(authStore.token)
    dataList.value = listaLibros.data
  } catch (error) {
    console.error('Error al obtener la lista de colecciones:', error)
  }
}

// Llamamos a handleListCollections cuando el componente se monta
onMounted(() => {
  handleListCollections()
})

const handleChange = () => {
  emits('update:modelValue', selectedOption.value)
}
</script>

<template>
  <div>
    <label class="mb-3 block text-sm font-medium text-black dark:text-white">
      Seleccionar la colección
    </label>
    <div class="relative z-20 bg-white dark:bg-form-input">
      <span class="absolute top-1/2 left-4 z-30 -translate-y-1/2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- SVG para el ícono de flecha -->
        </svg>
      </span>
      <select
        v-model="selectedOption"
        :class="{ 'text-black dark:text-white': isOptionSelected }"
        @change="handleChange"
        class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
      >
        <option value="" disabled selected>Selecciona una colección</option>
        <!-- Iteramos sobre dataList para mostrar las opciones -->
        <option
          v-for="option in dataList"
          :key="option._id"
          :value="option._id"
          class="text-body dark:text-bodydark"
        >
          {{ option.name }}
        </option>
      </select>
      <span class="absolute top-1/2 right-4 z-10 -translate-y-1/2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- SVG para el ícono de flecha desplegable -->
        </svg>
      </span>
    </div>
  </div>
</template>
