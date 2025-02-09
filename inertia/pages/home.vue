<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'

defineProps<{
  user: {
    username: string
  }
}>()
</script>

<template>
  <h1>Hello, {{ user.username }}</h1>
  <form @submit.prevent="useForm({}).post('logout')"><button type="submit">Log Out</button></form>
</template>
