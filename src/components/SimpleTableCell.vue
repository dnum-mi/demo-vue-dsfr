<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SimpleTableCell',

  props: {
    field: {
      type: [String, Object],
      default: undefined,
    },
  },

  computed: {
    displayField () {
      return typeof this.field === 'string' ? this.field : this.field.text
    },
    classField () {
      return {
        label: typeof this.field === 'object',
        [this.field.color]: true,
      }
    },
  },
})
</script>

<template>
  <td>
    <span :class="classField">{{ displayField }}</span>
  </td>
</template>

<style scoped>
.label {
  display: inline-block;
  width: 7rem;
  text-align: center;
  border-radius: 2rem;
}
.success {
  color: var(--success);
  background-color: var(--bg-success);
}
.error {
  color: var(--error);
  background-color: var(--bg-error);
}
.warning {
  color: var(--warning);
  background-color: var(--bg-warning);
}
.info {
  color: var(--info);
  background-color: var(--bg-info);
}
</style>
