<script setup>
import AppLayout from '../layout/AppLayout.vue';
import { useAuthStore } from '../stores/auth.store';
const auth = useAuthStore()
</script>
<template>
    <AppLayout>
        <section class="flex flex-col justify-center items-center p-6">
            <article class="flex flex-col items-center shadow-lg shadow-stone-950 bg-stone-600 p-6 rounded">
                <img :src="auth.user?.picture" class="border-gradient rounded-full" alt="">
                <h2><strong>Name : </strong>{{ auth.user?.name }}</h2>
                <h2><strong>Email : </strong>{{ auth.user?.email }}</h2>
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