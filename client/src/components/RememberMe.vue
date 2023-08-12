<script setup>
import { Session } from '../sessionController';
</script>
<template>
    <div class="flex gap-2 items-center p-2">
        <input id="remenber-me" type="checkbox" @input="(e) => Session.rememberMe = e.target.checked"><label
            for="remenber-me" class="text-stone-600">Remenber me</label>
    </div>
</template>