<script setup>
import { ref, onMounted } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import InputGroup from '@/components/Auths/InputGroup.vue'
import {
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useVueTable,
  createColumnHelper
} from '@tanstack/vue-table'
import { getLibro, getListadoLibros, postRegistrarColeccion } from '../../utils/api'
import { useFormStore } from '@/stores/useFormStore'

import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()
const authStore = useAuthStore()
// Cierra sesión empleando el store y navega hacia la página de login
const handleLogout = async () => {
  const isLogout = authStore.logout()
  if (isLogout) router.push('/login')
}

const pageTitle = ref('Catálogo de Libros')

const defaultData = ref([])
const handleListado = async () => {
  const listaLibros = await getListadoLibros()
  defaultData.value = listaLibros.data
}
// Fetch data when the component is mounted
onMounted(() => {
  handleListado()
})

const columnHelper = createColumnHelper()
const columns = [
  columnHelper.accessor('_id', {
    header: 'ID',
    size: 70,
    minSize: 70,
    meta: {
      style: {
        textAlign: 'end'
      }
    }
  }),
  columnHelper.accessor('isbn', {
    header: 'ISBN',
    size: 70,
    minSize: 70,
    meta: {
      style: {
        textAlign: 'end'
      }
    }
  }),
  columnHelper.accessor('cover', {
    header: 'Portada',
    size: 70,
    minSize: 70,
    meta: {
      style: {
        textAlign: 'end'
      }
    }
  }),
  columnHelper.accessor('title', {
    header: 'Título',
    size: 70,
    minSize: 70,
    meta: {
      style: {
        textAlign: 'end'
      }
    }
  }),
  columnHelper.accessor('author', {
    header: 'Autor',
    size: 70,
    minSize: 70,
    meta: {
      style: {
        textAlign: 'end'
      }
    }
  }),
  columnHelper.accessor('category', {
    header: 'Categoria',
    size: 70,
    minSize: 70,
    meta: {
      style: {
        textAlign: 'end'
      }
    }
  }),
  columnHelper.accessor('price', {
    header: 'Precio',
    size: 70,
    minSize: 70,
    meta: {
      style: {
        textAlign: 'end'
      }
    }
  }),
  columnHelper.accessor('url', {
    header: 'Enlace',
    size: 70,
    minSize: 70,
    meta: {
      style: {
        textAlign: 'end'
      }
    }
  }),
  columnHelper.accessor('createdAt', {
    header: 'Fecha Registro',
    size: 70,
    minSize: 70,
    meta: {
      style: {
        textAlign: 'end'
      }
    }
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Fecha Actualizado',
    size: 70,
    minSize: 70,
    meta: {
      style: {
        textAlign: 'end'
      }
    }
  })
]

const INITIAL_PAGE_INDEX = 0
const goToPageNumber = ref(INITIAL_PAGE_INDEX + 1)

const table = useVueTable({
  get data() {
    return defaultData.value
  },
  columns,
  initialState: {
    columnVisibility: {
      // Esconde las columnas
      _id: false,
      cover: false,
      url: false
    }
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(), //falta
  getPaginationRowModel: getPaginationRowModel()
})

function handleGoToPage(e) {
  const page = e.target.value ? Number(e.target.value) - 1 : 0
  goToPageNumber.value = page + 1
  table.setPageIndex(page)
}

// FILTRADO POR ISBN
const formStore = useFormStore() // Store de manipulación de estados de formulario
const { formState } = formStore

// Inicializamos los campos para evitar que se inicialicen valores de otras páginas que comparten los mismos campos
formState.isbn = ''
// Función para manejar el envio de los datos del formulario
const handleSubmit = async () => {
  if (formState.isbn == '') {
    const listaLibros = await getListadoLibros()
    defaultData.value = listaLibros.data
    return
  }

  const result = await getLibro(formState.isbn)
  defaultData.value = [result.data]
}

// Agregar coleccion
const handleAgregarFavoritos = async (idLibro) => {
  console.log(typeof idLibro, 'a,')
  await postRegistrarColeccion(authStore.token, idLibro, handleLogout)
}
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-270">
      <BreadcrumbDefault :pageTitle="pageTitle" />
      <!-- Buscador -->
      <div
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-8"
      >
        <div
          className="flex flex-row gap-5.5 p-6.5 items-end flex-wrap lg:justify-between justify-center borderpy-6 px-7.5 rounded-md "
        >
          <form
            @submit.prevent="handleSubmit"
            className="w-full flex items-center justify-center gap-4 flex-wrap lg:items-end xl:flex-nowrap lg:justify-start"
          >
            <InputGroup
              label="ISBN"
              name="isbn"
              id="isbn"
              type="isbn"
              placeholder="Ingresa el ISBN"
              extraclass="w-full rounded border-[1.5px] h-12 border-stroke bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
            <div class="w-full h-[80px] flex flex-col items-center md:items-center justify-center">
              <input
                @click.prevent="handleSubmit"
                type="submit"
                value="Actualizar"
                className="rounded-md px-4 cursor-pointer bg-primary text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 h-12"
              />
            </div>
          </form>
        </div>
      </div>
      <!-- Tabla de datos -->
      <div
        class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
      >
        <div class="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr
                v-for="headerGroup in table.getHeaderGroups()"
                :key="headerGroup.id"
                className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-center"
              >
                <th
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                  :colSpan="header.colSpan"
                >
                  <FlexRender
                    v-if="!header.isPlaceholder"
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white text-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in table.getRowModel().rows" :key="row.id">
                <td
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                  className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center"
                >
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </td>
                <td className="text-center border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      title="Agregar a favoritos"
                      className="button--icon"
                      @click="handleAgregarFavoritos(row.original._id)"
                    >
                      FAVORITOS
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr v-for="footerGroup in table.getFooterGroups()" :key="footerGroup.id">
                <th
                  v-for="header in footerGroup.headers"
                  :key="header.id"
                  :colSpan="header.colSpan"
                >
                  <FlexRender
                    v-if="!header.isPlaceholder"
                    :render="header.column.columnDef.footer"
                    :props="header.getContext()"
                  />
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <!-- Páginación -->
      <div
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <div className="flex flex-wrap justify-between my-6 mx-12">
          <div className="flex gap-2">
            <span> Se encontraron {{ table.getFilteredRowModel().rows.length }} registros </span>
          </div>
          <div class="flex items-center gap-4">
            <button
              class="p-1"
              @click="() => table.setPageIndex(0)"
              :disabled="!table.getCanPreviousPage()"
            >
              «
            </button>
            <button
              class="p-1"
              @click="() => table.previousPage()"
              :disabled="!table.getCanPreviousPage()"
            >
              ‹
            </button>
            <button class="p-1" @click="() => table.nextPage()" :disabled="!table.getCanNextPage()">
              ›
            </button>
            <button
              class="p-1"
              @click="() => table.setPageIndex(table.getPageCount() - 1)"
              :disabled="!table.getCanNextPage()"
            >
              »
            </button>
            <span class="flex items-center gap-1">
              <strong>
                {{ table.getState().pagination.pageIndex + 1 }} de
                {{ table.getPageCount() }} páginas
              </strong>
            </span>
            <span class="flex items-center gap-1">
              | Ir a la página:
              <input
                type="number"
                :value="goToPageNumber"
                @change="handleGoToPage"
                class="border p-1 rounded w-16"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
