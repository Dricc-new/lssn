<script setup>
import { RouterView } from 'vue-router'
import { Session } from './AuthController';
Session.init()
</script>
<template>
  <RouterView />
</template>