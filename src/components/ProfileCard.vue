<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

defineProps({
  show: Boolean,
})

const profile = computed(() => store.state.profile)

onMounted(() => {
  if (!profile.value.fullname) {
    store.dispatch('fetchProfile')
  }
})

const exit = () => {
  store.dispatch('toggleProfile')
  router.push({ name: 'Login' })
}
</script>

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
    <div class="text-center">
      <DsfrButton
        secondary
        class="fr-mt-2w"
        label="Déconnexion"
        icon="ri-logout-box-line"
        @click="exit"
      />
    </div>
  </div>
</template>

<style>
.text-center {
  text-align: center;
}
</style>
