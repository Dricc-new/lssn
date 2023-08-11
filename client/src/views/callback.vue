<script setup>
import { useRoute, useRouter } from 'vue-router';
import { Authenticate } from '../services/auth'
import { onMounted, ref } from 'vue';

const req = useRoute().query
const router = useRouter()
const err = ref('')
onMounted(async () => {
    if (req.code) {
        const res = await Authenticate(req)
        if (res.data.accessToken) {
            sessionStorage.accessToken = res.data.accessToken
            router.push('/dashboard')
        } else switch(res.data.status) {
            case 500: {
                router.push('/500')
                break;
            }
            case 404: {
                router.push('/404')
                break;
            }
            case 409: {
                err.value = res.data.message
                break;
            }
        }
    } else {
        // router.push('/')
    }
})
</script>
<template>
    <section class="h-screen w-screen flex justify-center max-sm:p-4 items-center">
        <article v-if="!err"
            class="bg-stone-800 p-4 container mx-auto shadow flex justify-center items-center gap-2 flex-col h-60 rounded">
            <h1 class="text-2xl text-center">We are verifying your identity.</h1>
            <h1 class="text-2xl text-center">Please wait a few seconds.</h1>
            <i class="fas fa-circle-notch text-6xl p-4 fa-pulse"></i>
        </article>
        <article v-else
            class="bg-stone-800 p-4 container mx-auto shadow flex justify-center items-center gap-2 flex-col h-60 rounded">
            <h1 class="text-2xl text-center">{{ err }}</h1>
        </article>
    </section>
</template>