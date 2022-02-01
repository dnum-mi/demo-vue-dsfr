<script setup>
import { computed, ref } from 'vue'

import { DsfrTabContent, getRandomId } from '@laruiss/vue-dsfr'
import Notification from './Notification.vue'

const statuses = [
  'Tous',
  'Validé',
  'En cours',
  'Refusé',
]

const props = defineProps({
  notifications: {
    type: Array,
    default: () => [],
  },
  show: Boolean,
})

const selectedTabIndex = ref(0)
// const selectedStatus = computed(() => statuses[selectedTabIndex.value])

const notifsArray = computed(() => [
  props.notifications,
  props.notifications.filter(notif => notif.status === 'Validé'),
  props.notifications.filter(notif => notif.status === 'En cours'),
  props.notifications.filter(notif => notif.status === 'Refusé'),
])

const asc = ref(true)

const selectTab = (idx) => {
  asc.value = selectedTabIndex.value < idx
  selectedTabIndex.value = idx
}

const tabTitles = [
  {
    title: 'Tous',
    tabId: getRandomId('tab'),
    panelId: getRandomId('tab', 'panel'),
  },
  {
    title: 'Validé',
    tabId: getRandomId('tab'),
    panelId: getRandomId('tab', 'panel'),
  },
  {
    title: 'En cours',
    tabId: getRandomId('tab'),
    panelId: getRandomId('tab', 'panel'),
  },
  {
    title: 'Refusé',
    tabId: getRandomId('tab'),
    panelId: getRandomId('tab', 'panel'),
  },
]
</script>

<template>
  <div
    v-show="show"
  >
    <h6>
      Centre
      de
      notifications
    </h6>
    <DsfrTabs
      tab-list-name="Centre de notifications"
      :tab-titles="tabTitles"
      @select-tab="selectTab($event)"
    >
      <DsfrTabContent
        v-for="(tabTitle, idx) in tabTitles"
        :key="idx"
        class="fr-p-0"
        :panel-id="tabTitle.panelId"
        :tab-id="tabTitle.tabId"
        :selected="selectedTabIndex === idx"
        :asc="asc"
      >
        <Notification
          v-for="(notif, index) in notifsArray[idx]"
          :key="index"
          v-bind="notif"
        />
      </DsfrTabContent>
    </DsfrTabs>
  </div>
</template>

<style scoped>
.anchor {
  position: absolute;
  width: 1px;
  height: 1px;
}
</style>
