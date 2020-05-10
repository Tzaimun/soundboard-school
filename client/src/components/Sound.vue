<template>
  <section class="section">
    <h1 v-on:click="playSound(_id, filename)"> {{ name }} </h1>
    <h2> {{ path }} </h2>
  </section>
</template>

<script>
import SoundService from '../services/SoundService'
export default {
  name: 'Sound',
  props: ['name', 'sound', 'path', '_id', 'filename'],
  data () {
    return {
    }
  },
  methods: {
    async playSound (_id, filename) {
      console.log(_id, filename)
      SoundService.streamSound(_id, filename)
    }
  }
}
</script>

<style scoped>

</style>
