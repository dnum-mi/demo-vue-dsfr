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

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as d3 from 'd3'

const props = defineProps({
  graphData: {
    type: Array,
    default: () => [],
  },
})

// Fonctionnalité Graph
const chart = ref(null)

function buildGraph (data) {
  d3.select('.chart')
    .selectAll('div')
    .data(data)
    .enter().append('div')
    .style('height', function (nb) { return nb * 5 + 'px' })
    .text(function (nb) { return nb })
}

onMounted(() => {
  buildGraph(props.graphData)
})

watch(() => props.graphData, (newVal) => {
  if (chart.value) {
    chart.value.innerHTML = ''
  }
  buildGraph(newVal)
})
</script>

<style>
.chart {
  display: flex;
  align-items: flex-end;
  height: 100%;
}
.chart div {
  font: 10px sans-serif;
  background-color: #fff;
  text-align: center;
  padding: 3px;
  margin: 1px;
  color: rgba(0, 17, 139, 0.7);
  width: 20px;
}

.container-chart {
  max-width: 300px;
  height: 100%;
  margin: auto;
  border: 1px solid #fff;
  padding: 0.5rem;
}
</style>
