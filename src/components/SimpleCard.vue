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
    <span>
      <img
        :src="logo"
        :title="`Connexion avec ${text}`"
        class="logo"
      >
    </span>
    <span class="text  fr-text--lg">{{ text }}</span>
  </button>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--g400);
  width: 100%;
  height: 10rem;
  background: none;
}

.text {
  font-weight: bold;
  color: var(--bf500);
  max-width: 8rem;
  display: inline-block;
  margin-bottom: 0 !important;
}

.text,
.logo {
  height: 4rem;
}
</style>
