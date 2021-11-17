<template>
  <div class="h-full">
    <div class="container-chart text-align-left">
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
    graphData (newVal) {
      this.$refs.chart.innerHTML = ''
      this.buildGraph(newVal)
    },
  },

  mounted () {
    this.buildGraph(this.graphData)
  },

  methods: {
    buildGraph (data) {
      d3.select('.chart')
        .selectAll('div')
        .data(data)
        .enter().append('div')
        .style('height', function (nb) { return nb * 5 + 'px' })
        .text(function (nb) { return nb })
    },
  },
}
</script>

<style scoped>
</style>

<style>
.chart {
  display: flex;
  align-items: flex-end;
  height: 100%;
}
.chart div {
  font: 10px sans-serif;
  background-color: var(--w);
  text-align: center;
  padding: 3px;
  margin: 1px;
  color: var(--bf500);
  width: 20px;
}

.container-chart {
  max-width: 300px;
  height: 100%;
  margin: auto;
  border: 1px solid var(--w);
  padding: 0.5rem;
}
</style>
