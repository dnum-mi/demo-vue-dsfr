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
      <teleport to="body">
        <DsfrModal
          v-if="isModalOpen"
          :opened="isModalOpen"
          @close="isModalOpen = false"
        >
          <h2 class="modal-title">
            Ajouter ou modifier un utilisateur
          </h2>
          <form @submit.prevent="addUser()">
            <div class="flex  flex-wrap  items-center  justify-center  mx-auto  max-w-40">
              <div class="flex-auto">
                <DsfrInput
                  type="text"
                  label="Nom"
                  label-visible
                  placeholder="Dupont"
                />
              </div>
              <div class="flex-auto">
                <DsfrInput
                  type="text"
                  label="Prénom"
                  label-visible
                  placeholder="Jean"
                />
              </div>
              <div class="flex-auto">
                <DsfrInput
                  type="text"
                  label="Référence"
                  label-visible
                  placeholder="QRN"
                />
              </div>
            </div>

            <div class="fr-my-2v  flex  row-reverse">
              <DsfrButton
                type="submit"
                label="Ajouter"
                class="fr-m-2v"
              />

              <DsfrButton
                type="reset"
                label="Annuler"
                class="fr-m-2v"
                secondary
                @click="isModalOpen = false"
              />
            </div>
          </form>
        </DsfrModal>
      </teleport>
    </div>
    <Notifications
      :notif-tab="notifTab"
    />
    <div class="btn-container">
      <DsfrButton
        icon="ri-add-line"
        label="Ajouter un utilisateur"
        @click="openForm()"
      />
    </div>
    <div class="flex  space-between  flex-wrap">
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
        <DsfrTable
          title="Derniers utilisateurs"
          :headers="headers"
          :rows="rows"
          class="fr-table--no-caption"
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
          <label
            for="graphSelect"
          >Sélectionnez un mois</label>
          <select
            id="graphSelect"
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

import BarGraph from '../components/BarGraph.vue'
import Notifications from '../components/Notifications.vue'

const getRandomInt = (min = 0, max = Number.MAX_SAFE_INTEGER) => Math.floor(min + Math.random() * (max + 1 - min))

const getArrayOfNElement = (nb) => Array.from({ length: nb })

const getRandomIntArray = (min, max, nb) =>
  getArrayOfNElement(nb).map(() => getRandomInt(min, max))

const randomIntArray = getRandomIntArray(3, 35, 13)

export default defineComponent({
  name: 'AppDashboard',

  components: {
    BarGraph,
    Notifications,
  },

  data () {
    const alertType = 'success'
    const alertTitle = 'L’utilisateur a été enregistré'
    const alertDescription = 'L’utilisateur va recevoir un email avec ses identifiants'
    const openAlert = false
    const isModalOpen = false
    const graphData = randomIntArray
    return {
      usersTotal: graphData.reduce((acc, cur) => (acc + cur), 0),
      graphData,
      alertType,
      alertTitle,
      alertDescription,
      openAlert,
      isModalOpen,
      // actions: [
      //   {
      //     label: 'Valider',
      //     onClick: () => {
      //       this.openAlert = true
      //       setTimeout(
      //         close,
      //         2000,
      //       )
      //     },
      //   },
      //   {
      //     label: 'Annuler',
      //     secondary: true,
      //     onClick: () => { this.isModalOpen = false },
      //   },
      // ],
      headers: ['Utilisateurs', 'Référence', 'Date', 'Statut'],
      rows: [
        [
          'Dulac Nathalie',
          'DL_776366FRJZKJ_21',
          '12/01/2022',
          { label: 'En cours', component: 'DsfrTag', class: 'info' },
        ],
        [
          'Legrand Jacques',
          'DL_776366FRJZKJ_21',
          '09/03/2022',
          { label: 'Erreur', component: 'DsfrTag', class: 'error' },
        ],
        [
          'Laforêt Caroline',
          'DL_776366FRJZKJ_21',
          '12/01/2022',
          { label: 'Validé', component: 'DsfrTag', class: 'success' },
        ],
        [
          'Lebois Stéphanie',
          'DL_776366FRJZKJ_21',
          '12/01/202',
          { label: 'En attente', component: 'DsfrTag', class: 'warning' },
        ],
        [
          'Legrand Jacques',
          'DL_776366FRJZKJ_21',
          '12/01/2022',
          { label: 'Validé', component: 'DsfrTag', class: 'success' },
        ],
        [
          'Goliath David',
          'DL_776366FRJZKJ_21',
          '12/01/2022',
          { label: 'En cours', component: 'DsfrTag', class: 'info' },
        ],
      ],
      notifTab: [
        {
          icon: 'ri-error-warning-line',
          iconOnly: true,
          class: 'success',
          label: 'Erreur sur Jacques Legrand',
          subDesc: 'Le 17 décembre 2021 à 10:21',
          statut: 'Validé',
          idNotif: 1,
        },
        {
          icon: 'ri-mail-line',
          iconOnly: true,
          class: 'warning',
          label: 'Mail de Jacques Lepetit',
          subDesc: 'Le 18 décembre 2021 à 10:21',
          statut: 'En cours',
          idNotif: 2,
        },
        {
          icon: 'ri-error-warning-line',
          iconOnly: true,
          class: 'error',
          label: 'Erreur sur Jacques Lemoyen',
          subDesc: 'Le 19 décembre 2021 à 10:21',
          statut: 'Refusé',
          idNotif: 3,
        },
      ],
    }
  },
  methods: {
    openForm () {
      this.isModalOpen = true
    },
    addUser () {
      this.openAlert = true
      this.isModalOpen = false
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

.max-w-40 {
  max-width: 22rem;
}

.mx-auto {
  margin-inline: auto;
}

.flex-auto {
  flex-basis: 51%;
  flex-grow: 1;
}

:deep(.flex-auto .fr-input) {
  width: 100%;
}

.flex-wrap {
  flex-wrap: wrap;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

:deep(.fr-table table) {
  display: table;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
  margin: 2rem 0;
  text-align: right;
}

.space-between {
  justify-content: space-between;
}

.row-reverse {
  flex-direction: row-reverse;
}

.list {
  flex-basis: 60%;
  flex-grow: 1;
  flex-shrink: 0;
  margin-right: 1rem;
  background-color: #f7f7fb;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 109, 0.1);
}

.table {
  width: 100%;
}

.table-title {
  margin-bottom: 1rem;
  font-size: 1.75rem;
  font-weight: 400;
  text-align: left;
}

.user-graph {
  display: flex;
  flex-basis: 20%;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  justify-content: space-between;
  padding: 1.5rem;
  margin: 0 0 0 1rem;
  background-color: rgba(0, 17, 139, 0.7);
  color: white;
  font-size: 1rem;
  font-weight: bold;
}

.modal-title {
  font-size: 1.5rem;
  line-height: 2rem;
}

.fr-display-lg {
  font-size: 4rem;
}

.graph-title {
  margin: 0;
  color: white;
  font-size: 1rem;
  line-height: 1rem;
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

.alert-container {
  position: absolute;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
}

.alert {
  max-width: 30rem;
  background-color: var(--w);
}
</style>
