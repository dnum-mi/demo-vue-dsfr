<script>
import { defineComponent } from 'vue'

import { DsfrTabContent, getRandomId } from '@laruiss/vue-dsfr'
import Notification from './Notification.vue'

const statuses = [
  'Tous',
  'Validé',
  'En cours',
  'Refusé',
]

export default defineComponent({
  name: 'Notifications',

  components: {
    DsfrTabContent,
    Notification,
  },

  props: {
    notifications: {
      type: Array,
      default: () => [],
    },
    show: Boolean,
  },

  data () {
    return {
      tabTitles: [
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
      ],
      selectedTabIndex: 0,
      asc: true,
    }
  },

  computed: {
    selectedStatus () {
      return statuses[this.selectedTabIndex]
    },
    notifsArray () {
      return [
        this.notifications,
        this.notifications.filter(notif => notif.statut === 'Validé'),
        this.notifications.filter(notif => notif.statut === 'En cours'),
        this.notifications.filter(notif => notif.statut === 'Refusé'),
      ]
    },
  },

  methods: {
    selectTab (idx) {
      this.asc = this.selectedTabIndex < idx
      this.selectedTabIndex = idx
    },
  },
})
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
