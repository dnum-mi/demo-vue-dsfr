<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount, nextTick } from 'vue'

import { useTheme } from '../composables/use-theme.js'
import BarGraph from '../components/BarGraph.vue'
import Notifications from '../components/Notifications.vue'
import ProfileCard from '../components/ProfileCard.vue'
import { useStore } from 'vuex'

const getRandomInt = (min = 0, max = Number.MAX_SAFE_INTEGER) => Math.floor(min + Math.random() * (max + 1 - min))

const getArrayOfNElement = (nb) => Array.from({ length: nb })

const getRandomIntArray = (min, max, nb) =>
  getArrayOfNElement(nb).map(() => getRandomInt(min, max))

const randomIntArray = getRandomIntArray(3, 35, 13)

const dictNotifStatus = {
  enabled: 'Validé',
  disabled: 'Refusé',
  pending: 'En cours',
}
const dictNotifClass = {
  enabled: 'success',
  disabled: 'error',
  pending: 'warning',
}
const dictNotifIcon = {
  mail: 'ri-mail-line',
  warning: 'ri-error-warning-line',
}

const dictUserClass = {
  disabled: 'error',
  pending: 'info',
  waiting: 'warning',
  enabled: 'success',
}
const dictUserLabel = {
  disabled: 'Erreur',
  pending: 'En cours',
  waiting: 'En attente',
  enabled: 'Validé',
}

const store = useStore()

const graphDict = {
  '2021-12': getRandomIntArray(3, 35, 13),
  '2021-11': getRandomIntArray(3, 35, 13),
  '2021-10': getRandomIntArray(3, 35, 13),
}

const options = [{
  text: 'Décembre 2021',
  value: '2021-12',
},
{

  text: 'Novembre 2021',
  value: '2021-11',
},
{
  text: 'Octobre 2021',
  value: '2021-10',
}]

const headers = ['Utilisateurs', 'Référence', 'Date', 'Statut']

// Toaster
const alertType = 'success'
const alertTitle = 'L’utilisateur a été enregistré'
const alertDescription = 'L’utilisateur va recevoir un email avec ses identifiants'
const openAlert = ref(false)
const isModalOpen = ref(false)
const addUser = () => {
  openAlert.value = true
  isModalOpen.value = false
}
const closeAlert = () => {
  openAlert.value = false
}
const openForm = () => {
  isModalOpen.value = true
}

// Graphdata
const graphData = ref(randomIntArray)
const getDataForMonth = (month) => {
  // Dans la vraie vie, ce serait un fetch ou un dispatch(<action>)
  return Promise.resolve(graphDict[month])
}
const changeGraphData = async (month) => {
  graphData.value = await getDataForMonth(month)
}

const usersTotal = computed(() => graphData.value.reduce((acc, cur) => (acc + cur), 0))

const month = ref(undefined)

// Users
const users = computed(() => store.state.users.map(
  (user) => {
    const { fullname, reference, date, status } = user
    return [
      fullname,
      reference,
      date,
      {
        label: dictUserLabel[status],
        component: 'DsfrTag',
        class: dictUserClass[status],
      },
    ]
  },
))

const fetchUsers = () => {
  store.dispatch('fetchUsers')
}
onMounted(() => {
  fetchUsers()
})

// Notifications
const fetchNotifications = () => {
  store.dispatch('fetchNotifications')
}
const notifLeft = ref(0)
const notifTop = ref(0)
const arrowCenter = ref(0)
const arrowLeft = ref(0)
const arrowTop = ref(0)
const notifContainer = ref(null)
const arrowUp = ref(null)
const placeNotifContainer = () => {
  const header = document.querySelector('.fr-header')
  const headerHeight = header.offsetHeight
  const notificationIcon = document.querySelector('.fr-links-group > li:nth-child(1)')
  const notifOffsetWidth = notifContainer.value?.offsetWidth
  arrowCenter.value = notificationIcon.offsetLeft + (notificationIcon.offsetWidth / 2)
  arrowLeft.value = arrowCenter.value - (arrowUp.value.offsetWidth / 2)
  notifLeft.value = arrowCenter.value - (notifOffsetWidth / 2)
  notifTop.value = headerHeight
  arrowTop.value = notifTop.value - 10
  // 2 * 10 parce que les marges horizontales sont de 10px
  if ((notifLeft.value + notifOffsetWidth + 2 * 10) > window.innerWidth) {
    notifLeft.value = notifLeft.value - ((notifLeft.value + notifOffsetWidth) - window.innerWidth) - 32
  }
}

const showNotifications = computed(() => store.state.showNotifications)
watch(
  showNotifications,
  async (newVal) => {
    if (newVal) {
      await nextTick()
      placeNotifContainer(1)
    }
  },
)
const notifications = computed(() => {
  return store.state.notifications.map(
    (notification) => {
      const { type, label, subDesc, status } = notification
      return {
        label,
        subDesc,
        icon: dictNotifIcon[type],
        iconOnly: true,
        class: dictNotifClass[status],
        status: dictNotifStatus[status],
      }
    })
})
onMounted(() => {
  window.addEventListener('resize', placeNotifContainer)
  fetchNotifications()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', placeNotifContainer)
  if (showNotifications.value) {
    store.dispatch('toggleNotifications')
  }
})

// Profile
const profileContainer = ref(null)
const arrowProfileUp = ref(null)
const profileLeft = ref(0)
const profileTop = ref(0)
const arrowProfileCenter = ref(0)
const arrowProfileLeft = ref(0)
const arrowProfileTop = ref(0)
const placeProfileContainer = () => {
  const header = document.querySelector('.fr-header')
  const headerHeight = header.offsetHeight
  const profileIcon = document.querySelector('.fr-links-group > li:nth-child(3)')
  const profileOffsetWidth = profileContainer.value?.offsetWidth
  console.log('value', arrowProfileCenter.value)
  arrowProfileCenter.value = profileIcon.offsetLeft + (profileIcon.offsetWidth / 2)
  console.log('value', arrowProfileCenter.value)
  arrowProfileLeft.value = arrowProfileCenter.value - (arrowProfileUp.value.offsetWidth / 2)
  profileLeft.value = arrowProfileCenter.value - (profileOffsetWidth / 2)
  profileTop.value = headerHeight
  arrowProfileTop.value = profileTop.value - 10
  if ((profileLeft.value + profileOffsetWidth + 2 * 10) > window.innerWidth) {
    profileLeft.value = profileLeft.value - ((profileLeft.value + profileOffsetWidth) - window.innerWidth) - 32
  }
}

const showProfile = computed(() => store.state.showProfile)
watch(
  showProfile,
  async (newVal) => {
    console.log('arrowProfileCenter.value', arrowProfileCenter.value)
    if (newVal) {
      console.log(arrowProfileCenter.value)
      await nextTick()
      placeProfileContainer(3)
      console.log(arrowProfileCenter.value)
    }
  },
)

onMounted(() => {
  window.addEventListener('resize', placeProfileContainer)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', placeProfileContainer)

  if (showProfile.value) {
    store.dispatch('toggleProfile')
  }
})

const darkTheme = ref(false)

const toggleTheme = () => {
  darkTheme.value = !darkTheme.value
}

onMounted(() => {
  const { theme } = useTheme()
  darkTheme.value = theme.value === 'dark'
  watch(darkTheme, (val) => { theme.value = darkTheme.value ? 'dark' : 'light' })
})
</script>

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
    <teleport to=".fr-links-group > li:first-child">
      <div
        v-show="showNotifications"
        ref="arrowUp"
        class="arrow-up"
        :style="{
          top: `calc(${arrowTop}px + 1rem)`,
          left: arrowLeft + 'px',
        }"
      />
      <div
        ref="notifContainer"
        class="notifications-container"
        :class="{ hidden: !showNotifications }"
        :style="{
          top: notifTop + 'px',
          left: notifLeft + 'px'
        }"
      >
        <Notifications
          :show="showNotifications"
          :notifications="notifications"
        />
      </div>
    </teleport>
    <teleport to=".fr-links-group > li:nth-child(0n+3)">
      <div
        v-show="showProfile"
        ref="arrowProfileUp"
        class="arrow-up"
        :style="{
          top: `calc(${arrowProfileTop}px + 1rem)`,
          left: arrowProfileLeft + 'px',
        }"
      />
      <div
        ref="profileContainer"
        class="notifications-container"
        :class="{ hidden: !showProfile }"
        :style="{
          top: profileTop + 'px',
          left: profileLeft + 'px'
        }"
      >
        <ProfileCard
          :show="showProfile"
        />
      </div>
    </teleport>
    <div class="btn-container">
      <DsfrButton
        :icon="darkTheme ? 'ri-sun-line' : 'ri-moon-fill'"
        :label="darkTheme ? 'Passer en mode clair' : 'Passer en mode sombre'"
        secondary
        @click="toggleTheme(darkTheme)"
      />
      <DsfrButton
        icon="ri-add-line"
        label="Ajouter un utilisateur"
        @click="openForm()"
      />
    </div>
    <div class="flex  flex-wrap">
      <div class="flex-w-full">
        <h2
          id="table-title"
          class="table-title"
        />
      </div>
      <div
        class="list"
      >
        <DsfrTable
          title="Derniers utilisateurs"
          :headers="headers"
          :rows="users"
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

        <DsfrSelect
          id="graphSelect"
          v-model="month"
          name="month"
          class="graph-select__input"
          :options="options"
          label="Sélectionner un mois"
          @change="changeGraphData(month)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fr-container {
  position: relative;
  margin-bottom: 2rem;
}

:deep(.fr-label) {
  color: var(--white);
}

.notifications-container {
  position: absolute;
  z-index: 2;
  /* right: 1rem; */
  width: 30rem;
  padding: 1rem;
  margin-top: 1rem;
  margin-right: 0;
  margin-left: 0;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 12px;
  text-align: left;
}

.arrow-up {
  position: absolute;
  z-index: 3;
  width: 0px;
  height: 0px;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #fff;
  border-left: 10px solid transparent;
}

.notifications-container.hidden {
  display: none;
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
  flex-basis: 30%;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 1.5rem;
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
