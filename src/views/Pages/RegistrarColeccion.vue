<script setup>
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import { useFormStore } from '@/stores/useFormStore'
import { useRouter } from 'vue-router'
import { postRegistrarColeccion } from '../../utils/api'
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()
const router = useRouter() // Store de enrutado
const pageTitle = ref('Registrar Nueva Colección')

const formStore = useFormStore() // Store de manipulación de estados de formulario
const { formState, resetForm } = formStore

// Inicializamos los campos para evitar que se inicialicen valores de otras páginas que comparten los mismos campos
formState.name = ''
// Función para manejar el envio de los datos del formulario
const handleSubmit = async () => {
  const dataBody = {
    name: formState.name
  }
  const fieldsToValidate = ['name']

  postRegistrarColeccion(authStore.token, formState, resetForm, fieldsToValidate, dataBody, () => {
    router.push('/colecciones')
  })
}
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-270">
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <div className="flex flex-col gap-9">
        <form
          @submit.prevent="handleSubmit"
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Información de la colección</h3>
          </div>
          <div>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <InputGroup
                    label="Nombre"
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Ingresa el nombre"
                  >
                    <svg
                      class="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 512 512"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24 32C10.7 32 0 42.7 0 56V456c0 13.3 10.7 24 24 24H40c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H24zm88 0c-8.8 0-16 7.2-16 16V464c0 8.8 7.2 16 16 16s16-7.2 16-16V48c0-8.8-7.2-16-16-16zm72 0c-13.3 0-24 10.7-24 24V456c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H184zm96 0c-13.3 0-24 10.7-24 24V456c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H280zM448 56V456c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H472c-13.3 0-24 10.7-24 24zm-64-8V464c0 8.8 7.2 16 16 16s16-7.2 16-16V48c0-8.8-7.2-16-16-16s-16 7.2-16 16z"
                      />
                    </svg>
                  </InputGroup>
                </div>
              </div>
              <input
                type="submit"
                value="Registrar nueva colección"
                class="w-full rounded bg-primary p-3 cursor-pointer font-medium text-gray hover:bg-opacity-90"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </DefaultLayout>
</template>
