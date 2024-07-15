<script setup>
import { ref, h } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import {
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useVueTable,
  createColumnHelper
} from '@tanstack/vue-table'
import { getLibro, getListadoLibros, getListadoLibrosXColeccion } from '../../utils/api'
import { useFormStore } from '@/stores/useFormStore'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/useAuthStore'
import SelectedCollections from '../../components/SelectedCollections.vue'

const authStore = useAuthStore()

const pageTitle = ref('Mis Favoritos')

const defaultData = ref([])

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
    cell: (props) => {
      const value = props.getValue()
      return h('div', { class: 'text-center w-full flex items-center justify-center' }, [
        h('img', {
          class: 'w-12',
          src: value,
          alt: value || 'Portada'
        })
      ])
    },
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

// FILTRADO POR COLECCION
const formStore = useFormStore() // Store de manipulación de estados de formulario
const { formState } = formStore

// Inicializamos los campos para evitar que se inicialicen valores de otras páginas que comparten los mismos campos
formState.isbn = ''
// Función para manejar el envio de los datos del formulario
const handleSubmit = async () => {
  if (selectedCollection.value) {
    const listaLibros = await getListadoLibrosXColeccion(authStore.token, selectedCollection.value)
    defaultData.value = listaLibros.data
    return
  }
}

const selectedCollection = ref('')
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
            <SelectedCollections v-model="selectedCollection" />
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
                <th className="py-4 px-4 font-bold text-black dark:text-white text-center">
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
                    <a
                      :href="`${row.original.url}`"
                      title="Agregar a favoritos"
                      class="button--icon"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        class="fill-primary w-8"
                      >
                        <path
                          d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                        />
                      </svg>
                    </a>
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
