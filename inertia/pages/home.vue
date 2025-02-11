<script setup lang="ts">
import '@shoelace-style/shoelace/dist/components/progress-ring/progress-ring.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import { computed } from 'vue'
import { useForm } from '@inertiajs/vue3'

const props = defineProps<{
  user: {
    username: string
    dailyGoal: number
  }
  gulps: Array<{
    volume: number
  }>
}>()

const current = computed(() => props.gulps.reduce((total, { volume }) => total + volume, 0))
const progress = computed(() =>
  Math.min(Math.floor((current.value / props.user.dailyGoal) * 100), 100)
)

const gulpForm = useForm({ volume: 500 })
</script>

<template>
  <h1>
    Hello, {{ user.username }} <sl-button @click="useForm({}).post('logout')">Log out</sl-button>
  </h1>

  <sl-progress-ring :value="progress" label="Today's hydration progress"
    >{{ current }} / {{ user.dailyGoal }}mL</sl-progress-ring
  >
  <form @submit.prevent="gulpForm.post('gulps')">
    <sl-input
      type="number"
      min="50"
      step="50"
      :value="gulpForm.volume"
      @input="gulpForm.volume = $event.target.value"
    ></sl-input>
    <sl-button type="submit" variant="primary">Log</sl-button>
  </form>
</template>
