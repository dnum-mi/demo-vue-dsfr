<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SimpleCard',

  props: {
    target: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
})
</script>

<template>
  <button class="card">
    <img
      :src="logo"
      :title="`Connexion avec ${text}`"
    >
    <span class="text  fr-text--lg">{{ text }}</span>
  </button>
</template>

<style scoped>
.card {
  border: 1px solid var(--g400);
  background: none;
  width: 100%;
  height: 10rem;
}

.text {
  font-weight: bold;
  color: var(--bf500);
  max-width: 8rem;
  display: inline-block;
}
</style>
