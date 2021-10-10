<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Notification',

  props: {
    iconOnly: Boolean,
    icon: {
      type: String,
      default: undefined,
    },
    label: {
      type: String,
      default: undefined,
    },
    subDesc: {
      type: String,
      default: undefined,
    },
  },

  methods: {
    onClick () {
      alert('click')
    },
  },
})
</script>

<template>
  <div class="notification">
    <div class="flex  items-center  fr-mx-1v">
      <DsfrTag
        :label="label"
        :icon="icon"
        :icon-only="iconOnly"
        :class="$attrs.class"
      />
    </div>
    <div>
      <p class="fr-text--sm  fr-p-0  fr-m-0">
        {{ label }}
      </p>
      <p class="fr-text--xs  fr-p-0  fr-m-0">
        {{ subDesc }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.notification {
  display: flex;
  border-bottom: 1px solid #ddd;
}
</style>
