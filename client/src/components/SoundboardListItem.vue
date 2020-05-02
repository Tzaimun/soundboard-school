<template>
  <section class="section">
    <div class="container">
      <font-awesome-icon  v-on:click="deleteSoundboard(_id)" class="trash-icon" icon="trash" />
      <h1 v-on:click="openSoundboard(_id)" class="title">Name: {{ name }}</h1>
      <h2 class="subtitle"> Sounds: {{ sounds.length }}</h2>
    </div>
    <div v-if="opened">
      <sound v-for="sound in sounds" v-bind:key="sound._id" v-bind:name="sound.name" v-bind:path="sound.path"></sound>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Sound from './Sound'

export default {
  name: 'Main',
  components: {
    Sound
  },
  props: ['name', '_id', 'sounds'],
  data () {
    return {
      opened: false
    }
  },
  methods: {
    async openSoundboard (_id) {
      await this.getSoundsFromServer(_id)
      this.opened = !this.opened
      console.log(this.opened)
    },
    ...mapActions([
      'deleteSoundboard',
      'getSoundsFromServer'
    ])
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
@media only screen and (max-width: 600px) {
  .container {
    width: 100%;
    font-size: 1rem;
    background-color: #ECECEC;
    padding: 1em;
    border-radius: 10px;
  }
  .section {
    padding: 0.5em;
  }
}
@media only screen and (min-width: 600px) {
  .container {
    width: 50%;
    background-color: #ECECEC;
    padding: 1em;
    border-radius: 10px;
  }
  .section {
    padding: 0.5em;
  }
  .trash-icon {
    float: right;
  }
}
</style>
