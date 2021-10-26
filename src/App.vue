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
          path: '#',
          label: 'profil',
          icon: 'ri-user-line',
          iconOnly: true,
        },
      ],
    }
  },

  methods: {
    toggleNotifications () {
      this.$store.dispatch('toggleNotifications')
    },
  },
}
</script>
