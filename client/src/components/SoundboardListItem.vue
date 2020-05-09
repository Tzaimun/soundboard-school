<template>
  <section class="section">
    <div class="container soundboard">
      <font-awesome-icon  v-on:click="deleteSoundboard(_id)" class="trash icon" icon="trash" />
      <h1 v-on:click="openSoundboard(_id)" class="title">Name: {{ name }}</h1>
      <h2 class="subtitle"> Sounds: {{ sounds.length }}</h2>
    </div>
    <div class="container sounds" v-if="opened">
      <font-awesome-icon v-on:click="addSound()" class="icon" icon="plus" />
      <sound v-for="sound in sounds" v-bind:key="sound._id" v-bind:name="sound.name" v-bind:path="sound.path"></sound>
    </div>
    <sound-upload v-if="add_sound"></sound-upload>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Sound from './Sound'
import SoundUpload from './UploadSounds'

export default {
  name: 'SoundboardListItem',
  components: {
    SoundUpload,
    Sound
  },
  props: ['name', '_id', 'sounds'],
  data () {
    return {
      opened: false,
      add_sound: false
    }
  },
  methods: {
    async openSoundboard (_id) {
      //  await this.getSoundsFromServer(_id)
      this.opened = !this.opened
      //  console.log(this.opened)
    },
    async addSound () {
      this.add_sound = !this.add_sound
      //  console.log(this.add_sound)
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
    width: 90%;
    font-size: 1rem;
    padding: 1em;
  }

  .soundboard {
    background-color: #ECECEC;
    border-radius: 10px;
  }

  .sounds {
    background-color: white;
    min-height: 50px;
  }

  .section {
    padding: 0.5em;
  }

  .icon {
    float: right;
  }
}

@media only screen and (min-width: 600px) {
  .container {
    width: 50%;
    padding: 1em;
  }

  .soundboard {
    background-color: #ECECEC;
    border-radius: 10px;
  }

  .sounds {
    background-color: white;
    min-height: 50px;
  }

  .section {
    padding: 0.5em;
  }

  .icon {
    float: right;
  }
}
</style>
