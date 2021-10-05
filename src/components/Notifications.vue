<script>
  import { defineComponent } from "vue";

  export default defineComponent( {
    name: 'Notifications',

    data () {
      return {
        tabTitles: [
          {
            title: 'Tous',
          },
          {
            title: 'Validé',
          },
          {
            title: 'En cours',
          },
          {
            title: 'Refusé',
          },
        ],
        tabContents: [
          //à remplacer par des composants à afficher ?
          'Contenu Tous',
          'Contenu Validé',
          'Contenu En cours',
          'Contenu Refusé',
        ],
      }
    },
  })
</script>
<template>
  <DsfrTabs
    tabListName='Centre de notifications'
    :tabTitles="tabTitles"
    :tabContents="tabContents"
  >
  </DsfrTabs>
</template>
