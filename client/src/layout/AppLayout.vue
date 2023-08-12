<script setup>
import { useAuthStore } from '../stores/auth.store';
import { getProfile } from '../services/auth';

const auth = useAuthStore()
if (auth.accessToken && !auth.user) getProfile().then((res) => {
    auth.user = res.data
}).catch((err) => {
    console.log(err)
})
</script>
<template>
    <nav class="p-2 bg-stone-900 shadow-sm shadow-stone-950">
        <menu v-if="!auth"
            class="justify-end bg-clip-text text-transparent bg-gradient-to-tl from-sky-700 to-purple-950 font-bold text-xl flex gap-2">
            <li class="cursor-pointer" @click="() => $router.push({ name: 'login' })">Login</li>
            <li class="cursor-pointer" @click="() => $router.push({ name: 'register' })">Register</li>
        </menu>
        <menu>
        </menu>
    </nav>
    <main class="container max-sm:p-2 mx-auto">
        <slot />
    </main>
</template>