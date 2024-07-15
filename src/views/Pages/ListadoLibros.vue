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
import { getLibro, getListadoColecciones, getListadoLibros } from '../../utils/api'
import { useFormStore } from '@/stores/useFormStore'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/useAuthStore'
import dayjs from 'dayjs'

const authStore = useAuthStore()
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
    cell: (info) => dayjs(info.getValue()).format('DD/MM/YYYY hh:mm:ss'),
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
    cell: (info) => dayjs(info.getValue()).format('DD/MM/YYYY hh:mm:ss'),
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
  const listadoSuperiores = await getListadoColecciones(authStore.token)
  const opcionesListaEmpresaHTML = listadoSuperiores.data
    ?.map(
      (option) => `
          <option value="${option._id}" class="text-body dark:text-bodydark">
            ${option.name}
          </option>
        `
    )
    .join('')

  Swal.fire({
    title: 'Asignar en una colección',
    html: `
          <form class="px-2">
            <div class="flex flex-col sm:flex-row items-center justify-between">
              <label for="coleccion" class="font-bold text-left">Lista de Colecciones</label>
              <select id="coleccion" class="swal2-select w-10">
              <option selected value='' disabled>Elegir</option>
                ${opcionesListaEmpresaHTML}
              </select>
            </div>
          </form>`,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Asignar Colección',
    confirmButtonColor: '#46589d',
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      const coleccionSelected = Swal.getPopup().querySelector('#coleccion').value
      const dataBody = {
        bookId: idLibro
      }

      try {
        const response = await fetch(
          `https://bookstore.mgi.pe/api/collections/${coleccionSelected}/add-item`,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${authStore.token}`
            },
            body: JSON.stringify(dataBody)
          }
        )
        const res = await response.json()
        if (res.status == 'success') {
          Swal.fire({
            title: 'Libro agregado a la colección',
            text: res.message,
            icon: 'success',
            confirmButtonColor: '#46589d'
          })
        } else {
          Swal.fire({
            title: 'No se pudo realizar la solicitud',
            text: res.message,
            icon: 'error',
            confirmButtonColor: '#46589d'
          })
          return
        }
      } catch (error) {
        Swal.showValidationMessage(`
            Request failed: ${error}
          `)
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  })
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
                    <button
                      title="Agregar a favoritos"
                      className="button--icon"
                      @click="handleAgregarFavoritos(row.original._id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        class="w-8 fill-red"
                      >
                        <path
                          d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm16-208v48h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V384H368c-8.8 0-16-7.2-16-16s7.2-16 16-16h48V304c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                        />
                      </svg>
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
