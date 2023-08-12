<script setup>
import Header from '../components/Header.vue';
import AppLayout from '../layout/AppLayout.vue';
import { Session } from '../sessionController';
const user = Session.User()
</script>
<template>
    <AppLayout>
        <Header class="text-center p-10 text-xl">Hi, How are you {{ user.name }}?</Header>
        <section class="flex max-sm:flex-col justify-center gap-6">
            <article v-for="iten in 3" :key="i" class="shadow shadow-slate-500 rounded p-6 bg-white cursor-pointer hover:shadow-lg hover:shadow-slate-600">
                <Header class="text-lg">Title</Header>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime et adipisci tempore excepturi assumenda
                    eaque amet. Sunt recusandae expedita aspernatur explicabo illo, tempora reiciendis voluptatem soluta
                    eligendi repellat tempore pariatur?</p>
            </article>
        </section>
    </AppLayout>
</template>
<style>
.border-gradient {
    background: linear-gradient(#1313fd, #60028f) padding-box,
        linear-gradient(to right, #1313fd, #60028f) border-box;
    border-radius: 50em;
    border: 2px solid transparent;
}
</style>