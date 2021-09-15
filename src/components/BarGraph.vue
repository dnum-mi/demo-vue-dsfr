<template>
  <div class="h-full">
    <div class="container-chart text-align-left">
      <div class="chart" />
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

  mounted () {
    d3.select('.chart')
      .selectAll('div')
      .data(this.graphData)
      .enter().append('div')
      .style('height', function (nb) { return nb * 5 + 'px' })
      .text(function (nb) { return nb })
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
