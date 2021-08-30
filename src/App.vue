<template>
  <DsfrHeader
    :service-title="serviceTitle"
    :service-description="serviceDescription"
    :logo-text="logoText"
    :quick-links="quickLinks"
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
          path: '/mentions-legales',
          label: 'Mentions légales',
          icon: 'ri-file-list-2-line',
        },
      ],
    }
  },
}
</script>
