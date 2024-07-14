<script setup>
import HeaderArea from '@/components/Header/HeaderArea.vue'
import SidebarArea from '@/components/Sidebar/SidebarArea.vue'

/**
 * Componente principal que estructura la estructura básica de la aplicación.
 * 
 * Este componente incluye un área de barra lateral (`SidebarArea`) y un área de encabezado (`HeaderArea`),
 * con un contenido principal dinámico que puede ser insertado mediante slots.
 */
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!-- ===== Inicio del Sidebar ===== -->
    <SidebarArea />
    <!-- ===== Fin del Sidebar ===== -->

    <!-- ===== Inicio del Content Area ===== -->
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <!-- ===== Inicio del Header ===== -->
      <HeaderArea />
      <!-- ===== Fin del Header ===== -->

      <!-- ===== Inicio del Main Content ===== -->
      <main>
        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <slot></slot>
        </div>
      </main>
      <!-- ===== Fin del Main Content ===== -->
    </div>
  </div>
</template>
