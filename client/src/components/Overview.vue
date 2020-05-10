<template>
<div class="background">
  <div class="container">
    <h1> Soundboard Home </h1>
    <div class="new-soundboard columns is-mobile bg">
      <b-button v-on:click="newSoundboard" class="column is-half is-offset-one-quarter adding" expanded>Add a soundboard</b-button>
    </div>
    <div>
      <soundboard-add v-if="openNewSoundboard" ></soundboard-add>
      <soundboard v-for="soundboard in soundboards.data" v-bind:key="soundboard._id" v-bind:name="soundboard.name" v-bind:sounds="soundboard.sounds" v-bind:_id="soundboard._id"></soundboard>
    </div>
    <!--<div class="retrieve-data columns is-mobile">
      <b-button v-on:click="retrieveData" class="column is-half is-offset-one-quarter" type="is-primary" expanded>Retrieve soundboards!</b-button>
    </div>
    <div class="retrieve-data columns is-mobile">
      <b-button v-on:click="testSoundboards" class="column is-half is-offset-one-quarter" type="is-primary" expanded>test soundboards!</b-button>
    </div>-->
  </div>
  </div>
</template>

<script>
import Soundboard from './SoundboardListItem'
import SoundboardAdd from './SoundboardAdd'
import SoundboardService from '../services/SoundboardService'
//  import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'Main',
  components: {
    Soundboard,
    SoundboardAdd
  },
  data () {
    return {
      //  soundboards: {},
      openNewSoundboard: false,
      error: null
    }
  },
  created () {
    /*
    const response = this.$store.getters.getSoundboards
    console.log(response + 'Created!')
    */
    this.$store.dispatch('getSoundboardsFromApi')
  },
  computed: {
    ...mapGetters({
      soundboards: 'getSoundboards'
    })
  },
  methods: {
    async retrieveData () {
      try {
        const response = await SoundboardService.retrieveSoundboards()
        console.log({ data: response.data })
        this.soundboards = { data: response.data }
      } catch (err) {
        this.error = err.response.data.error
        console.log('failed to get from backend')
      }
    },
    async newSoundboard () {
      this.openNewSoundboard = !this.openNewSoundboard
    },
    testSoundboards () {
      console.log(this.soundboards)
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.new-soundboard {
  margin-bottom: 0;
}
.container {
  display: block;
  background-color: #9fc5f8;
  padding-bottom: 500px;
}
.adding{
  border-color: black;
  margin-top: 110px;
  background-color: #2f3f53;
  color: white;
}
.retrieve{
  margin-top: 35px;
  background-color: #2f3f53;
  color: white;
  
}
.test{
  margin-top: 25px;
  background-color: #2f3f53;
  color: white;
}
h1{
  color:  black;
  font-weight: bold;
  font-size: 25px;
  padding-top: 100px;
  }
.background{
  background-color: #9fc5f8;
}
</style>
