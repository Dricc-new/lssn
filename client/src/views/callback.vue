<script setup>
import { useRoute } from 'vue-router';
import { Authenticate } from '../services/auth'
const req = useRoute().query
if(req.code) {
    Authenticate(req)
}

console.log(useRoute().query)


</script>
<template>
    this callback
</template>