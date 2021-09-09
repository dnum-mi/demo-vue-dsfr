<template>
  <table class="simple-table">
    <caption class="caption">
      Derniers utilisateurs
    </caption>
    <thead>
      <tr
        class="header"
      >
        <th
          v-for="header in headers"
          :key="header"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, i) in rows"
        :key="i"
        class="body-row"
      >
        <SimpleTableCell
          v-for="(field, j) in row"
          :key="`${i}-${j}`"
          :field="field"
        />
      </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent } from 'vue'

import SimpleTableCell from './SimpleTableCell.vue'

export default defineComponent({
  name: 'SimpleTable',

  components: {
    SimpleTableCell,
  },

  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
  },
})
</script>

<style scoped>
.simple-table {
  border-collapse: collapse;
  background-color: var(--w);
}

th,
td {
  padding: 0 1rem;
}

.header {
  text-align: left;
  border-bottom: 2px solid var(--g500);
  height: 3.5rem;
  font-size: 0.9em;
  color: var(--g600);
  background-color: var(--g100);
}

.caption {
  font-size: 1.75rem;
  text-align: left;
  margin-bottom: 1rem;
  position: absolute;
  left: -10000px;
}

.body-row {
  border-bottom: 1px solid var(--g300);
  line-height: 2rem;
  height: 4rem;
}
</style>
