<script setup>
import { RouterLink } from 'vue-router';
import { redirectLinkedinAuth } from '../services/auth';

</script>
<template>
    <section class="flex flex-col justify-center p-4">
        <div class="bg-stone-200 rounded p-4 flex flex-col gap-2">
            <h1 class="text-stone-900 font-bold text-2xl">Register</h1>
            <button @click="async () => redirectLinkedinAuth('register')"
                class="px-2 p-1 bg-gradient-to-br from-blue-600 to-stone-800  rounded flex gap-2 justify-center items-center ">
                <i class="fab fa-linkedin text-2xl"></i>Sign up with Linkedin
            </button>
        </div>
        <RouterLink to="/login" class="mt-2 text-sky-500">I have an account, sign in.</RouterLink>
    </section>
</template>