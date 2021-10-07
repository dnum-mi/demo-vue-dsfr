<template>
  <div class="user-graph">
    <div>
      <h3 class="graph-title">
        Utilisateurs {{ selectedOption }}
      </h3>
      <span class="graph-output">{{ usersTotal }}</span>
      <div class="graph-display">
        <BarGraph
          :graph-data="graphData"
        />
      </div>
    </div>
    <DsfrSelect
      v-model="selectedOption"
      :options="options"
      label="Sélectionnez un mois"
    />
  </div>
</template>

<script>
import BarGraph from './BarGraph.vue'

const getRandomInt = (min = 0, max = Number.MAX_SAFE_INTEGER) => Math.floor(min + Math.random() * (max + 1 - min))

const getArrayOfNElement = (nb) => Array.from({ length: nb })

const getRandomIntArray = (min, max, nb) =>
  getArrayOfNElement(nb).map(() => getRandomInt(min, max))

const graphs = [
  getRandomIntArray(3, 35, 13),
  getRandomIntArray(3, 35, 13),
  getRandomIntArray(3, 35, 13),
]

export default {
  name: 'UserGraph',

  components: {
    BarGraph,
  },

  data () {
    const options = ['Octobre 2021', 'Novembre 2021', 'Décembre 2021']
    const selectedIndex = 0
    return {
      selectedOption: options[selectedIndex],
      selectedIndex,
      options,
    }
  },

  computed: {
    graphData () {
      return graphs[this.options.findIndex(option => option === this.selectedOption)]
    },
    usersTotal () {
      return this.graphData.reduce((acc, cur) => (acc + cur), 0)
    },
  },
}
</script>

<style scoped>
.user-graph {
  display: flex;
  flex-basis: 20%;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  justify-content: space-between;
  padding: 1.2rem;
  margin: 0 0 0 1rem;
  background-color: rgba(0, 17, 139, 0.7);
  color: white;
  font-size: 1rem;
  font-weight: bold;
}

.graph-display {
  width: 100%;
  height: 12rem;
  margin: 1rem 0;
}

.graph-select__input {
  width: 100%;
  height: 2rem;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 5px;
}

:deep(.fr-label) {
  color: white;
}

.graph-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}

.graph-output {
  display: block;
  margin: 0 0 1.5rem 0;
  color: white;
  font-size: 3.5rem;
  line-height: 3.5rem;
}
</style>
