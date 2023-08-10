<script setup>
</script>
<template>
    <section class="flex flex-col justify-center p-4">
        <div class="bg-stone-200 rounded p-4 flex flex-col gap-2">
            <h1 class="text-stone-900 font-bold text-2xl">Register</h1>
            <a href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78nkipq7uznlee&redirect_uri=http://localhost:5173/callback&state=foobar&scope=email%20openid%20profile" class="px-2 p-1 bg-gradient-to-br from-blue-600 to-stone-800  rounded flex gap-2 justify-center items-center ">
                <i class="fab fa-linkedin text-2xl"></i>Sign up with Linkedin
            </a>
        </div>
        <RouterLink to="/register" class="mt-2 text-sky-500">I have an account, sign in.</RouterLink> 
    </section>
</template>