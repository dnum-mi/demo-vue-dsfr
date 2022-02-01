<template>
  <DsfrHeader
    v-if="$route.name !== 'Login'"
    :service-title="serviceTitle"
    :service-description="serviceDescription"
    :logo-text="logoText"
    :quick-links="quickLinks"
    show-search
  />
  <router-view />
</template>

<script>
import { checkHealth } from './api/api-utils.js'

export default {
  name: 'App',

  components: {},

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
          onClick: ($event) => {
            $event.preventDefault()
            this.toggleNotifications()
          },
        },
        {
          path: '/aide',
          label: 'aide',
          icon: 'ri-question-line',
          iconOnly: true,
        },
        {
          label: 'Liste d’utilisateurs',
          path: { name: 'UsersList' },
          icon: 'ri-user-search-fill',
        },
        {
          path: '#',
          label: 'profil',
          icon: 'ri-user-line',
          iconOnly: true,
          onClick: ($event) => {
            $event.preventDefault()
            this.toggleProfile()
          },
        },
      ],
    }
  },

  mounted () {
    checkHealth()
  },

  methods: {
    toggleNotifications () {
      if (this.$store.state.showProfile) this.$store.dispatch('toggleProfile')
      this.$store.dispatch('toggleNotifications')
    },
    toggleProfile () {
      if (this.$store.state.showNotifications) this.$store.dispatch('toggleNotifications')
      this.$store.dispatch('toggleProfile')
    },
  },
}
</script>
