<script setup>
import { redirectLinkedinAuth } from '../services/auth';
defineProps({
    action: String
})
</script>
<template>
    <button @click="async () => redirectLinkedinAuth(action)"
        class="px-2 p-1 bg-gradient-to-br from-blue-600 to-stone-800 text-white rounded flex gap-2 justify-center items-center ">
        <i class="fab fa-linkedin text-2xl"></i>
        <slot />
    </button>
</template>