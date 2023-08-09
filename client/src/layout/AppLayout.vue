<template>
    <nav class="p-2 bg-stone-900 shadow-sm shadow-stone-950">
        <menu
            class="justify-end bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-green-700 font-bold text-xl flex gap-2">
            <li @click="() => $router.push({ name: 'login' })">Login</li>
            <li @click="() => $router.push({ name: 'register' })">Register</li>
        </menu>
    </nav>
    <main class="container max-sm:p-2 mx-auto">
        <slot />
    </main>
</template>