<script setup>
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import { useFormStore } from '@/stores/useFormStore'
import { useRouter } from 'vue-router'
import { postRegistrarLibro } from '../../utils/api'
import PriceComponent from '../../components/PriceComponent.vue'

const router = useRouter() // Store de enrutado
const pageTitle = ref('Registrar Nuevo Libro')

const formStore = useFormStore() // Store de manipulación de estados de formulario
const { formState, resetForm } = formStore

// Inicializamos los campos para evitar que se inicialicen valores de otras páginas que comparten los mismos campos
formState.isbn = ''
formState.cover = ''
formState.title = ''
formState.price = ''
formState.author = ''
formState.category = ''
formState.url = ''
// Función para manejar el envio de los datos del formulario
const handleSubmit = async () => {
  const dataBody = {
    isbn: formState.isbn,
    cover: formState.cover,
    title: formState.title,
    price: formState.price,
    author: formState.author,
    category: formState.category,
    url: formState.url
  }
  const fieldsToValidate = ['isbn', 'cover', 'title', 'price', 'author', 'category', 'url']

  postRegistrarLibro(formState, resetForm, fieldsToValidate, dataBody, () => {
    router.push('/')
  })
}

const precioLibro = ref('')
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
            <h3 className="font-medium text-black dark:text-white">Información del Libro</h3>
          </div>
          <div>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <InputGroup
                    label="ISBN"
                    name="isbn"
                    id="isbn"
                    type="text"
                    placeholder="Ingresa el ISBN"
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
                <div className="w-full xl:w-1/2">
                  <InputGroup
                    label="Portada"
                    name="cover"
                    id="cover"
                    type="text"
                    placeholder="Ingresa el enlace de la portada"
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
                        d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
                      />
                    </svg>
                  </InputGroup>
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <InputGroup
                    label="Título"
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Ingresa el título del libro"
                  >
                    <svg
                      class="fill-current"
                      width="22"
                      height="22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        d="M0 64C0 46.3 14.3 32 32 32H80h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H112V208H336V96H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h48 48c17.7 0 32 14.3 32 32s-14.3 32-32 32H400V240 416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H368 320c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V272H112V416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V240 96H32C14.3 96 0 81.7 0 64z"
                      />
                    </svg>
                  </InputGroup>
                </div>
                <div className="w-full xl:w-1/2">
                  <!--<InputGroup
                    label="Precio"
                    name="price"
                    id="price"
                    type="text"
                    placeholder="Ingresa el precio del libro"
                  >
                    <svg
                      class="fill-current"
                      width="22"
                      height="22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        d="M0 112.5V422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4V89.7c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM288 352c-44.2 0-80-43-80-96s35.8-96 80-96s80 43 80 96s-35.8 96-80 96zM64 352c35.3 0 64 28.7 64 64H64V352zm64-208c0 35.3-28.7 64-64 64V144h64zM512 304v64H448c0-35.3 28.7-64 64-64zM448 96h64v64c-35.3 0-64-28.7-64-64z"
                      />
                    </svg>
                  </InputGroup> -->
                  <PriceComponent v-model="precioLibro" />
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <InputGroup
                    label="Autor"
                    name="author"
                    id="author"
                    type="text"
                    placeholder="Ingresa el nombre del autor"
                  >
                    <svg
                      class="fill-current"
                      width="22"
                      height="22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                      />
                    </svg>
                  </InputGroup>
                </div>
                <div className="w-full xl:w-1/2">
                  <InputGroup
                    label="Categoria"
                    name="category"
                    id="category"
                    type="text"
                    placeholder="Ingresa la categoria del libro"
                  >
                    <svg
                      class="fill-current"
                      width="22"
                      height="22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                      />
                    </svg>
                  </InputGroup>
                </div>
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <InputGroup
                    label="Enlace de compra"
                    name="url"
                    id="url"
                    type="text"
                    placeholder="Ingresa el enlace de buscalibre"
                  >
                    <svg
                      class="fill-current"
                      width="22"
                      height="22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                      />
                    </svg>
                  </InputGroup>
                </div>
              </div>

              <input
                type="submit"
                value="Registrar nuevo libro"
                class="w-full rounded bg-primary p-3 cursor-pointer font-medium text-gray hover:bg-opacity-90"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </DefaultLayout>
</template>
