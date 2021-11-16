<template>
  <div v-show="show">
    <h6>
      Mon profil
    </h6>
    <DsfrCard
      no-arrow
      :title="profile.fullname"
      horizontal
      :alt-img="`Avatar de ${profile.fullname}`"
      :detail="profile.service"
      :description="profile.description"
      :img-src="profile.imgSrc"
      :link="profile.link || '#'"
    />
    <DsfrButton
      secondary
      label="Déconnexion"
      icon="ri-arrow-left-line"
      @click="exit"
    />
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProfileCard',

  props: {
    show: Boolean,
  },

  computed: {
    profile () {
      return this.$store.state.profile
    },
  },

  mounted () {
    if (!this.profile.fullname) {
      this.$store.dispatch('fetchProfile')
    }
  },

  methods: {
    exit () {
      this.$store.dispatch('toggleProfile')
      this.$router.push({ name: 'Login' })
    },
  },
})

</script>
