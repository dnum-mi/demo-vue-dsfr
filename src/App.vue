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

  data () {
    return {
      serviceTitle: 'FDR',
      serviceDescription: 'Force de développement rapide',
      logoText: ['Ministère', 'de l’intérieur'],
      quickLinks: [
        {
          path: '/notifications',
          label: '',
          icon: 'ri-notification-3-line',
        },
        {
          path: '/aide',
          label: '',
          icon: 'ri-question-line',
        },
        {
          path: '/profile',
          label: '',
          icon: 'ri-user-line',
        },
      ],
    }
  },
}
</script>
