<script setup>
import Header from './Header.vue';
</script>
<template>
    <article class="bg-stone-100 rounded shadow shadow-slate-500 min-w-[300px] p-4 flex flex-col gap-2">
        <Header class="text-2xl">
            <slot name="title" />
        </Header>
        <slot />
    </article>
</template>