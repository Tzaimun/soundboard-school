<template>
  <div>
    <div>
      <soundboard v-for="soundboard in soundboards.data" v-bind:key="soundboard._id" v-bind:name="soundboard.name" v-bind:sounds="soundboard.sounds"></soundboard>
    </div>
    <div class="register columns is-mobile">
      <b-button v-on:click="checkData" class="column is-half is-offset-one-quarter" type="is-primary" expanded>Retrieve soundboards!</b-button>
    </div>
  </div>
</template>

<script>
import Soundboard from './SoundboardListItem'
import SoundboardService from '../services/SoundboardService'
export default {
  name: 'Main',
  components: {
    Soundboard
  },
  data () {
    return {
      soundboards: {}
    }
  },
  async created () {
    console.log('created called')
    try {
      const response = await SoundboardService.retrieveSoundboards()
      console.log({ data: response.data })
      this.soundboards = { data: response.data }
    } catch (err) {
      this.error = err.response.data.error
      console.log('failed to get from backend')
    }
  },
  methods: {
    async checkData () {
      try {
        const response = await SoundboardService.retrieveSoundboards()
        console.log({ data: response.data })
        this.soundboards = { data: response.data }
      } catch (err) {
        this.error = err.response.data.error
        console.log('failed to get from backend')
      }
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
</style>
