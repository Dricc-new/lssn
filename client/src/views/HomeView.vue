<script setup>
import AppLayout from '../layout/AppLayout.vue';
</script>

<template>
  <AppLayout color="#222">
    <section class="flex flex-col-reverse sm:flex-row gap-10 min-h-[50vh] justify-center sm:items-center home">
      <article class="">
        <h1
          class="text-center font-bold sm:text-left bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-green-700 text-5xl">
          Welcome</h1>
        <p class="text-center sm:text-left max-w-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          pariatur, porro
          harum accusamus itaque corrupti
          voluptatum perferendis eos? Molestiae, dicta. Ratione, et suscipit modi eaque eligendi eum sunt impedit in?</p>
      </article>
      <article class="-z-[1] relative">
        <div class="gradient"></div>
        <div class="absolute top-0 right-0 w-full h-full flex justify-center items-center">
          <img src="/logo.png" alt="">
        </div>
      </article>
    </section>
  </AppLayout>
</template>
