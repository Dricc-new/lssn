<script setup>
import { RouterLink } from 'vue-router'
import LinkedinAuth from '../components/LinkedinAuth.vue';
import RememberMe from '../components/RememberMe.vue'
import AuthLayout from '../layout/AuthLayout.vue'
import AuthPanel from '../components/AuthPanel.vue';
</script>
<template>
    <AuthLayout>
        <AuthPanel>
            <template #title>Login</template>
            <RememberMe />
            <LinkedinAuth action="login">Continue with Linkedin</LinkedinAuth>
        </AuthPanel>
        <RouterLink to="/register" class="mt-2 text-sky-500">I don't have an account, create one.</RouterLink>
    </AuthLayout>
</template>