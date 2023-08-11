<script setup>
import { useRoute } from 'vue-router';
import { getAccessToken } from '../services/auth'
const req = useRoute().query
if(req.code) {
    getAccessToken(req)
}

console.log(useRoute().query)


</script>
<template>
    this callback
</template>