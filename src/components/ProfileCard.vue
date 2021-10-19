<template>
  <h6>
    Mon profil
  </h6>
  <DsfrCard
    noArrow
    title="Damien Lebois"
    horizontal
    altImg=""
    detail="SG / DNUM / SDSI / BRR / Pôle dev"
    description="Responsable de projet"
    imgSrc="https://placekitten.com/500/500"
    link="https://www.systeme-de-design.gouv.fr/"
  />
  <DsfrButton
    secondary
    label="Déconnexion"
    icon="ri-arrow-left-line"
    @click="exit"
  />
</template>
<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'ProfileCard',

  computed: {

  },

  methods: {
    exit () {
      alert("On quitte")
    }
  }
})

</script>

<style scoped>

</style>
