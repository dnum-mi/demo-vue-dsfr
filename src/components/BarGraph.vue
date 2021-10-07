<template>
  <div class="h-full">
    <div class="container-chart  text-align-left">
      <div
        ref="chart"
        class="chart"
      />
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'BarGraph',

  props: {
    graphData: {
      type: Array,
      default: () => [],
    },
  },

  data () {
    return {}
  },

  watch: {
    graphData () {
      this.createGraph()
    },
  },

  mounted () {
    this.createGraph()
  },

  methods: {
    createGraph () {
      this.$refs.chart.innerHTML = ''
      d3.select(this.$refs.chart)
        .selectAll('div')
        .data(this.graphData)
        .enter().append('div')
        .style('height', function (nb) { return nb * 5 + 'px' })
        .text(function (nb) { return nb })
    },
  },
}
</script>

<style scoped>
.chart {
  display: flex;
  height: 100%;
  align-items: flex-end;
}
.chart :deep(div) {
  width: 20px;
  padding: 3px;
  margin: 1px;
  background-color: var(--w);
  color: var(--bf500);
  font: 10px sans-serif;
  text-align: center;
}

.container-chart {
  max-width: 300px;
  height: 100%;
  padding: 0.5rem;
  border: 1px solid var(--w);
  margin: auto;
}
</style>
