<template>
  <DsfrHeader
    v-if="$route.name !== 'Login'"
    :service-title="serviceTitle"
    :service-description="serviceDescription"
    :logo-text="logoText"
    :quick-links="quickLinks"
    show-search
  />
  <Popper>
    <button>Notifications</button>
    <template #content>
      <Notifications
        :notif-tab="notifTab"
      />
    </template>
  </Popper>
  <router-view />
</template>

<script>
import Popper from 'vue3-popper'
import Notifications from './components/Notifications.vue'

export default {
  name: 'App',

  components: {
    Popper,
    Notifications,
  },

  data () {
    return {
      serviceTitle: 'FDR',
      serviceDescription: 'Force de développement rapide',
      logoText: ['Ministère', 'de l’intérieur'],
      quickLinks: [
        {
          path: '#',
          label: 'notifications',
          icon: 'ri-notification-3-line',
          iconOnly: true,
        },
        {
          path: '/aide',
          label: 'aide',
          icon: 'ri-question-line',
          iconOnly: true,
        },
        {
          path: '/profil',
          label: 'profil',
          icon: 'ri-user-line',
          iconOnly: true,
        },
      ],
    }
  },
}
</script>
