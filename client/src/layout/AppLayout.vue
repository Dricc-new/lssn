<script setup>
import { ref } from 'vue';
import { Session } from '../sessionController';
const menuToggle = ref(false)
</script>
<template>
    <nav class="px-6 p-2 z-50 text-white bg-stone-800 shadow-sm shadow-stone-950 flex">
        <menu
            class="justify-start container mx-auto items-center font-bold text-xl flex gap-2">
            <li class="cursor-pointer" @click="() => $router.push({ name: 'home' })">Home</li>
        </menu>
        <menu v-if="!Session.isAuthenticated()"
            class="justify-end  font-bold text-xl flex gap-2">
            <li class="cursor-pointer" @click="() => $router.push({ name: 'login' })">Login</li>
            <li class="cursor-pointer" @click="() => $router.push({ name: 'register' })">Register</li>
        </menu>
        <menu v-else
            class="justify-end container mx-auto items-center  font-bold text-xl flex gap-2">
            <li class="relative">
                <img @click="menuToggle = menuToggle?false:true" :src="Session.User().picture" class="rounder shadow object-cover h-12 rounded-full cursor-pointer" alt="">
                <menu v-if="menuToggle" class="text-gray-900 rounded py-2 shadow-md min-w-[200px] shadow-slate-500 text-base absolute right-0 top-14 bg-white">
                    <li class="hover:bg-blue-300 cursor-pointer p-2 px-4" @click="() => $router.push({ name: 'dashboard' })">Dashboard</li>
                    <li class="hover:bg-blue-300 cursor-pointer p-2 px-4" @click="() => $router.push({ name: 'profile' })">Profile</li>
                    <hr>
                    <li class="hover:bg-blue-300 cursor-pointer p-2 px-4 flex items-center justify-between" @click="() => {Session.logout();$router.push('/')}">Log out <i class="fas fa-power-off"></i></li>
                </menu>
            </li>
        </menu>
    </nav>
    <main class="container max-sm:p-2 mx-auto">
        <slot />
    </main>
</template>