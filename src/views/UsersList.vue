<template>
  <div class="fr-container">
    <h1>
      Liste d’utilisateurs
    </h1>
    <DsfrTable
      class="board-table"
      title="Utilisateurs"
      :rows="rows"
    >
      <template #header>
        <tr>
          <DsfrTableHeader
            v-for="(header, idx) of headers"
            :key="header"
            :header="header"
            :icon="getIcon(idx)"
            @click="sortDataSource(header)"
          />
        </tr>
      </template>
    </DsfrTable>
    <DsfrModal
      :opened="openedModal"
      title="Edition"
      :actions="actionsModal"
      @close="cancelModif"
    >
      <form>
        <fieldset>
          <DsfrInput
            v-model="dataForm[1]"
            class="fr-mb-6v"
            label="Nom"
            :label-visible="true"
            placeholder="Nom"
            :model-value="dataForm[1]"
          />
          <DsfrInput
            v-model="dataForm[2]"
            class="fr-mb-6v"
            label="Prénom"
            :label-visible="true"
            placeholder="Prénom"
            :model-value="dataForm[2]"
          />
          <DsfrInput
            v-model="dataForm[3]"
            class="fr-mb-6v"
            label="Courriel"
            :label-visible="true"
            placeholder="Courriel"
            :model-value="dataForm[3]"
          />
          <DsfrInput
            v-model="dataForm[4]"
            class="fr-mb-6v"
            label="Téléphone"
            :label-visible="true"
            placeholder="Téléphone"
            :model-value="dataForm[4]"
          />
        </fieldset>
      </form>
    </DsfrModal>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

const dataSource = [
  { rowData: ['2340585382094352add34', 'Durand', 'Martin', 'martin.durand@gmail.com', '0123456789'] },
  { rowData: ['2340585382094352aff34', 'Dupont', 'Pierre', 'pierre.dupont@yahoo.fr', '0234567891'] },
  { rowData: ['2340585382094352add32', 'Martin', 'Jean', 'jean.martin@gmail.com', '012345679'] },
  { rowData: ['2340585382094352aff28', 'Jacques', 'Pierre', 'pierre.jacques@yahoo.fr', '0235567891'] },
]

export default defineComponent({
  name: 'BoardView',

  data () {
    return {
      dataSource,
      originalDataSource: dataSource,
      openedModal: false,
      headers: ['Id', 'Nom', 'Prénom', 'courriel', 'téléphone', 'actions'],
      dataForm: [0, '', '', '', ''],
      sorted: undefined,
      actionsModal: [
        {
          label: 'Valider',
          onClick: () => this.sendData(),
        },
        {
          label: 'Annuler',
          secondary: true,
          onclick: () => this.cancelModif(),
        },
      ],
    }
  },

  computed: {
    rows () {
      return this.originalDataSource.map((row) => ({
        ...row,
        rowData: [
          ...row.rowData,
          { component: 'DsfrButton', label: 'éditer', icon: 'ri-pencil-line', iconOnly: true, secondary: true, onClick: () => { this.showModal(row.rowData) } },
        ],
      })).sort((a, b) => {
        const result = String(a.rowData[Math.abs(this.sorted)]).localeCompare(String(b.rowData[Math.abs(this.sorted)]))
        return Math.sign(this.sorted) * result
      })
    },
  },

  methods: {
    async getData () {
      await new Promise((resolve) => setTimeout(resolve, 0)) // fetch get
      return dataSource
    },
    async sendData () {
      await new Promise((resolve) => setTimeout(resolve(this.dataForm[0]), 0))
        .then(id => console.log(id)) // fetch post avec this.dataForm
      const id = this.dataForm[0]
      this.dataSource.find(el => el.rowData[0] === id).rowData = this.dataForm
      this.openedModal = false
    },
    showModal (rowData) {
      // this.dataForm = rowData
      this.dataForm = [...rowData]
      this.openedModal = true
    },
    cancelModif () {
      this.dataForm = [0, '', '', '', '']
      this.openedModal = false
    },
    getIcon (idx) {
      const name = this.sorted
        ? this.sorted < 0 ? 'ri-sort-asc' : 'ri-sort-desc'
        : undefined
      const color = (Math.abs(this.sorted) === idx) ? 'black' : 'gray'
      return { name, color }
    },
    sortDataSource (columnName) {
      const index = this.headers.findIndex(header => header === columnName)
      if (this.sorted === index) {
        this.sorted = -index
      } else if (this.sorted === undefined) {
        this.sorted = index
      } else {
        this.sorted = undefined
        this.dataSource = this.originalDataSource
      }
    },
  },
})
</script>

<style>
.board-table th:nth-child(1),
.board-table td:nth-child(1) {
  display: none;
}
</style>

<style scoped>
.flex {
  display: flex;
}

.space-between {
  justify-content: space-between;
}

:deep(.pointer) {
  cursor: pointer;
}
</style>
