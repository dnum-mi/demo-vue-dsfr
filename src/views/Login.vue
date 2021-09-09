<script>
import { defineComponent } from 'vue'
import SimpleCard from '../components/SimpleCard.vue'

export default defineComponent({
  name: 'AppLogin',

  components: {
    SimpleCard,
  },

  props: {
    applicationName: {
      type: String,
      default: '[application]',
    },
    logoText: {
      type: [String, Array],
      default: () => ['Ministère', 'de l’intérieur'],
    }
  },

  methods: {
    goToHome () {
      this.$router.push({ name: 'Home' })
    }
  }
})
</script>

<template>
<div class="flex min-h-full  h-full">
  <div class="content-box  fr-container  flex  justify-center">
    <div>
      <DsfrLogo
        :logo-text="logoText"
      />
      <div>
        <h1 class="connection-title  fr-text--xl">
          Connectez-vous à {{applicationName}}
        </h1>
        <p class="connection-description  fr-text--sm">
          Choisissez un mode de connexion
        </p>
        <ul class="connection-modes">
          <li class="connection-modes__mode">
            <SimpleCard
              target="passage2"
              logo=""
              text=""
              @click="goToHome()"
            />
          </li>
          <li class="connection-modes__mode">
            <SimpleCard
              target="france-connect"
              logo=""
              text="France Connect"
              @click="goToHome()"
            />
          </li>
          <li class="connection-modes__mode">
            <SimpleCard
              target="agent-connect"
              logo=""
              text="Agent Connect"
              @click="goToHome()"
            />
          </li>
          <li class="connection-modes__mode">
            <SimpleCard
              target="compte-interne"
              logo=""
              text="Compte interne"
              @click="goToHome()"
            />
          </li>
        </ul>
        <p class="connection-description  fr-text--sm">
          Vous ne savez pas comment vous connecter,
          <br>
          <a class="fr-link  fr-text--sm" href="">contactez le support</a> de {{applicationName || '[application]'}}.
        </p>
      </div>
    </div>
  </div>
  <div class="background-box">
  </div>
</div>

</template>

<style scoped>
.container {
  min-width: 40rem;
  max-width: 600px;
  margin: auto;
}

.content-box {
  flex-basis: 50%;
  min-width: 40rem;
}
.background-box {
  flex-basis: 50%;
  flex-shrink: 1;
  background-color:rgb(0,0,128);
}

.connection-description {
  color: var(--g500);
}

.connection-modes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
}

.connection-modes__mode {
  flex-basis: 34%;
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0.5rem;
}

.fr-link {
  padding: 0;
}
</style>
