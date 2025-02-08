<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'

const form = useForm({
  email: null,
  password: null,
  remember: false,
})
</script>

<template>
  <Head title="Login" />

  <form @submit.prevent="form.post('login')">
    <label>
      <input type="email" maxlength="254" v-model="form.email" />
      Email
    </label>
    <div v-if="form.errors.email">{{ form.errors.email }}</div>
    <label>
      <input type="password" v-model="form.password" />
      Password
    </label>
    <div v-if="form.errors.password">{{ form.errors.password }}</div>
    <label>
      <input type="checkbox" v-model="form.remember" />
      Remember Me
    </label>
    <button type="submit" :disabled="form.processing">Login</button>
  </form>
</template>
