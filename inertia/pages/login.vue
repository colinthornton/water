<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'

const form = useForm({
  email: null,
  password: null,
  remember: false,
})
</script>

<template>
  <Head title="Login" />

  <form @submit.prevent="form.post('login')">
    <sl-input
      type="email"
      required
      maxlength="254"
      label="Email"
      :value="form.email"
      @input="form.email = $event.target.value"
    ></sl-input>
    <br />
    <sl-input
      type="password"
      required
      password-toggle
      label="Password"
      :value="form.password"
      @input="form.password = $event.target.value"
    ></sl-input>
    <br />
    <sl-checkbox :value="form.remember" @input="form.remember = $event.target.checked"
      >Remember Me</sl-checkbox
    >
    <br />
    <br />
    <sl-button type="submit" variant="primary">Submit</sl-button>
  </form>
</template>
