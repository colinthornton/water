<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js'
import '@shoelace-style/shoelace/dist/components/tab/tab.js'
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js'

const loginForm = useForm({
  username: '',
  password: '',
  remember: false,
})

const signupForm = useForm({
  username: '',
  password: '',
  password_confirmation: '',
  timezone: new Intl.DateTimeFormat().resolvedOptions().timeZone,
})

function clearPasswordConfirmation() {
  signupForm.password_confirmation = ''
}
</script>

<template>
  <Head title="Login" />

  <sl-tab-group>
    <sl-tab slot="nav" panel="login">Log In</sl-tab>
    <sl-tab slot="nav" panel="signup">Sign Up</sl-tab>

    <sl-tab-panel name="login">
      <form @submit.prevent="loginForm.post('login')">
        <sl-input
          type="text"
          autocomplete="username"
          required
          maxlength="254"
          label="Username"
          :help-text="loginForm.errors.username"
          :value="loginForm.username"
          @input="loginForm.username = $event.target.value"
        ></sl-input>
        <br />
        <sl-input
          type="password"
          autocomplete="current-password"
          required
          minlength="7"
          password-toggle
          label="Password"
          :help-text="loginForm.errors.password"
          :value="loginForm.password"
          @input="loginForm.password = $event.target.value"
        ></sl-input>
        <br />
        <sl-checkbox :value="loginForm.remember" @input="loginForm.remember = $event.target.checked"
          >Remember Me</sl-checkbox
        >
        <br />
        <br />
        <sl-button type="submit" variant="primary">Submit</sl-button>
      </form>
    </sl-tab-panel>

    <sl-tab-panel name="signup">
      <form
        @submit.prevent="
          signupForm.post('signup', {
            onError: clearPasswordConfirmation,
          })
        "
      >
        <sl-input
          type="text"
          autocomplete="username"
          required
          maxlength="254"
          label="Username"
          :help-text="signupForm.errors.username"
          :value="signupForm.username"
          @input="signupForm.username = $event.target.value"
        ></sl-input>
        <br />
        <sl-input
          type="password"
          autocomplete="new-password"
          required
          minlength="7"
          password-toggle
          label="Password"
          :help-text="signupForm.errors.password"
          :value="signupForm.password"
          @input="signupForm.password = $event.target.value"
        ></sl-input>
        <br />
        <sl-input
          type="password"
          autocomplete="new-password"
          required
          minlength="7"
          label="Confirm Password"
          :value="signupForm.password_confirmation"
          @input="signupForm.password_confirmation = $event.target.value"
        ></sl-input>
        <br />
        <sl-button type="submit" variant="primary">Submit</sl-button>
      </form>
    </sl-tab-panel>
  </sl-tab-group>
</template>
