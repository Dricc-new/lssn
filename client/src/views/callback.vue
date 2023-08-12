<script setup>
import { useRoute, useRouter } from 'vue-router';
import { Authenticate, getProfile } from '../services/auth'
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { Session } from '../sessionController';
import Header from '../components/Header.vue';

const req = useRoute().query
const router = useRouter()
const err = ref('')
const auth = useAuthStore()
onMounted(async () => {
    try {
        if (req.code) {
            const res = await Authenticate(req)
            if (res.data.accessToken) {
                await Session.login(res.data.accessToken)
                router.push('/dashboard')
            } else switch (res.data.status) {
                case 500: {
                    router.push('/500')
                    break;
                }
                case 404: {
                    router.push('/404')
                    break;
                }
                default: {
                    err.value = res.data.message
                    break;
                }
            }
        }
    } catch (e) {
        err.value = e
    }
})
</script>
<template>
    <section class="h-screen w-screen flex justify-center max-sm:p-4 items-center">
        <article v-if="!err"
            class="mx-auto flex justify-center items-center gap-2 flex-col h-60">
            <h1 class="text-2xl text-center">We are verifying your identity.</h1>
            <h1 class="text-2xl text-center">Please wait a few seconds.</h1>
            <i class="fas fa-circle-notch text-6xl text-sky-600 p-4 fa-pulse"></i>
        </article>
        <article v-else
            class="container mx-auto flex justify-center items-center">
            <Header class="text-2xl text-center">{{ err }}</Header>
        </article>
    </section>
</template>