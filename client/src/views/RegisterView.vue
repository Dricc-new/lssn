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
            <template #title>Register</template>
            <RememberMe />
            <LinkedinAuth action="register">Sign up with Linkedin</LinkedinAuth>
        </AuthPanel>
        <RouterLink to="/login" class="mt-2 text-sky-500">I have an account, sign in.</RouterLink>
    </AuthLayout>
</template>