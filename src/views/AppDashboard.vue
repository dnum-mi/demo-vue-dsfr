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
      <UserGraph />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import UserGraph from '../components/UserGraph.vue'

export default defineComponent({
  name: 'AppDashboard',

  components: {
    UserGraph,
  },

  data () {
    const alertType = 'success'
    const alertTitle = 'L’utilisateur a été enregistré'
    const alertDescription = 'L’utilisateur va recevoir un email avec ses identifiants'
    const openAlert = false
    const isModalOpen = false

    return {
      alertType,
      alertTitle,
      alertDescription,
      openAlert,
      isModalOpen,
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

.btn-container > .fr-btn {
  padding: 0.5rem 1rem;
  font-weight: 700;
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

:deep(.fr-table td:first-child) {
  font-weight: bold;
}

.modal-title {
  font-size: 1.5rem;
  line-height: 2rem;
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
