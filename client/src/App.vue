<script setup>
import { RouterView } from 'vue-router'
import { Session } from './sessionController';
Session.init()
</script>

<template>
  <RouterView />
</template>