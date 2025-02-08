<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
</script>

<template>
  <h1>Home</h1>
  <form @submit.prevent="useForm({}).post('logout')"><button type="submit">Log Out</button></form>
</template>
