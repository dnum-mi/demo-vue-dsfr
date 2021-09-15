<template>
  <div class="fr-container">
    <div class="alert-container">
      <DsfrAlert
        :closed="!openAlert"
        class="alert"
        :type="alertType"
        :title="alertTitle"
        :description="alertDescription"
        closeable
        @close="closeAlert()"
      />
    </div>
    <div class="btn-container">
      <DsfrButton
        icon="ri-add-line"
        label="Ajouter un utilisateur"
        @click="addUser()"
      />
    </div>
    <div class="flex  flex-wrap">
      <div class="flex-w-full">
        <h2
          id="table-title"
          class="table-title"
        >
          Derniers utilisateurs
        </h2>
      </div>
      <div
        class="list"
      >
        <SimpleTable
          :headers="headers"
          :rows="rows"
          class="table"
          aria-labelledby="table-title"
        />
      </div>
      <div class="user-graph">
        <div>
          <h3 class="graph-title">
            Utilisateurs décembre 2021
          </h3>
          <span class="fr-display-lg">{{ usersTotal }}</span>
          <div class="graph-display">
            <BarGraph
              :graph-data="graphData"
            />
          </div>
        </div>
        <div class="graph-select__group">
          <label>Sélectionnez un mois</label>
          <select
            id=""
            name="month"
            class="graph-select__input"
          >
            <option value="2021-12">
              Décembre 2021
            </option>
            <option value="2021-11">
              Novembre 2021
            </option>
            <option value="2021-10">
              Octobre 2021
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import SimpleTable from '../components/SimpleTable.vue'
import BarGraph from '../components/BarGraph.vue'

const getRandomInt = (min = 0, max = Number.MAX_SAFE_INTEGER) => Math.floor(min + Math.random() * (max + 1 - min))

const getArrayOfNElement = (nb) => Array.from({ length: nb })

const getRandomIntArray = (min, max, nb) =>
  getArrayOfNElement(nb).map(() => getRandomInt(min, max))

const randomIntArray = getRandomIntArray(3, 35, 13)

export default defineComponent({
  name: 'AppDashboard',

  components: {
    SimpleTable,
    BarGraph,
  },

  data () {
    const alertType = 'success'
    const alertTitle = 'L\'opération est un succès !'
    const alertDescription = 'Blabla Blabla Blabla'
    const openAlert = false
    console.log({ openAlert })
    const graphData = randomIntArray
    return {
      usersTotal: graphData.reduce((acc, cur) => (acc + cur), 0),
      graphData,
      alertType,
      alertTitle,
      alertDescription,
      openAlert,
      headers: ['Utilisateurs', 'Référence', 'Date', 'Statut'],
      rows: [
        [
          'Dulac Nathalie',
          'DL_776366FRJZKJ_21',
          '12/01/2022',
          { text: 'En cours', type: 'label', color: 'info' },
        ],
        [
          'Legrand Jacques',
          'DL_776366FRJZKJ_21',
          '09/03/2022',
          { text: 'Erreur', type: 'label', color: 'error' },
        ],
        [
          'Laforêt Caroline',
          'DL_776366FRJZKJ_21',
          '12/01/2022',
          { text: 'Validé', type: 'label', color: 'success' },
        ],
        [
          'Lebois Stéphanie',
          'DL_776366FRJZKJ_21',
          '12/01/202',
          { text: 'En attente', type: 'label', color: 'warning' },
        ],
        [
          'Legrand Jacques',
          'DL_776366FRJZKJ_21',
          '12/01/2022',
          { text: 'Validé', type: 'label', color: 'success' },
        ],
        [
          'Goliath David',
          'DL_776366FRJZKJ_21',
          '12/01/2022',
          { text: 'En cours', type: 'label', color: 'info' },
        ],
      ],
    }
  },
  methods: {
    addUser () {
      this.openAlert = true
    },
    closeAlert () {
      this.openAlert = false
    },
  },
})
</script>

<style scoped>
.fr-container {
  position: relative;
  margin-bottom: 2rem;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
  margin: 2rem 0;
  text-align: right;
}

.flex {
  justify-content: space-between;
}

.list {
  flex-basis: 60%;
  flex-grow: 1;
  flex-shrink: 0;
  margin-right: 1rem;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 109, 0.1);
  background-color: #f7f7fb;
}

.table {
  width: 100%;
}

.table-title {
  font-weight: 400;
  font-size: 1.75rem;
  text-align: left;
  margin-bottom: 1rem;
}

.user-graph {
  display: flex;
  flex-direction: column;
  flex-basis: 20%;
  flex-grow: 1;
  flex-shrink: 1;
  background-color: rgba(0,17,139, 0.7);
  margin: 0 0 0 1rem;
  padding: 1.5rem;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  justify-content: space-between;
}

.fr-display-lg {
  font-size: 4rem;
}

.graph-title {
  color: white;
  font-size: 1rem;
  line-height: 1rem;
  margin: 0;
}

.graph-display {
  height: 12rem;
  width: 100%;
  margin: 1rem 0;
}
.graph-select__input {
  border-radius: 5px;
  height: 2rem;
  width: 100%;
  background-color: white;
  margin-top: 0.5rem;
}

.alert-container {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.alert {
  background-color: var(--w);
  max-width: 30rem;
}
</style>
