<script setup>
const props = defineProps(['subtitle', 'title', 'customClasses'])

// Lista de frases de libros (puedes agregar más frases según tus preferencias)
const bookQuotes = [
  {
    quote: 'Un libro es un sueño que tienes en tus manos.',
    author: '- Neil Gaiman'
  },
  {
    quote: 'No hay amigo tan íntimo como un libro.',
    author: '- Ernest Hemingway'
  },
  {
    quote: 'Los libros son un espejo: sólo se ve en ellos lo que uno lleva dentro.',
    author: '- Carlos Ruiz Zafón'
  },
  {
    quote: 'Un buen libro es aquel que se abre con expectativas y se cierra con provecho.',
    author: '- Amos Bronson Alcott'
  }
]

// Función para obtener una cita aleatoria
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * bookQuotes.length)
  return bookQuotes[randomIndex]
}

// Estado para almacenar la cita actual
const currentQuote = getRandomQuote()
</script>

<template>
  <div
    class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
  >
    <div class="flex flex-wrap items-center">
      <div class="hidden w-full xl:block xl:w-1/2">
        <div class="py-17.5 px-26 text-center">
          <router-link class="mb-5.5 inline-block" to="/">
            <img class="hidden dark:block" src="@/assets/images/logo/logo.png" alt="Logo" />
          </router-link>

          <!-- Mostrar la cita aleatoria -->
          <blockquote class="font-medium 2xl:px-20 flex flex-col items-end justify-center">
            <p class="max-w-[280px]">{{ currentQuote.quote }}</p>
            <footer>{{ currentQuote.author }}</footer>
          </blockquote>

          <span class="mt-10 inline-block max-w-80 max-h-100">
            <img
              src="@/assets/images/illustration/books-01.jpg"
              alt="Ilustración"
              class="w-full object-cover"
            />
          </span>
        </div>
      </div>
      <div class="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
        <div class="w-full p-4 sm:p-12.5 xl:p-17.5">
          <span class="mb-1.5 block font-medium">{{ props.subtitle }}</span>
          <h2 class="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            {{ props.title }}
          </h2>

          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
