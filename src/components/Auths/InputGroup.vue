<script setup>
const props = defineProps(['label', 'type', 'name', 'id', 'placeholder', 'extraClass'])

import { useFormStore } from '@/stores/useFormStore'
const formStore = useFormStore()
const { formState } = formStore
</script>

<template>
  <div class="mb-4">
    <label class="mb-2.5 block font-medium text-black dark:text-white">{{ props.label }}</label>
    <div class="relative">
      <input
        :type="props.type"
        :name="props.name"
        :id="props.id"
        :placeholder="props.placeholder"
        v-model="formState[props.name]"
        :class="[
          'w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white',
          props.extraClass // Agrega la clase extra pasada por props si está definida
        ]"
      />

      <span class="absolute right-4 top-4">
        <slot></slot>
      </span>
    </div>
  </div>
</template>
