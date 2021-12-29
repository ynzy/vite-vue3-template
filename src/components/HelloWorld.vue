<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()
console.log(import.meta.env);

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style lang="scss" scoped>
h1 {
  color: $theme-color;
}
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
