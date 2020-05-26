<template>
  <section class="section">
    <div class="container">
      <h1 class="title"> Name: {{ name }} </h1>
      <b-input class="name-input" v-on:keydown.enter="login" type="name" placeholder="name" v-model="name"></b-input>
      <b-button v-on:click="updateSoundboards(name)" class="column is-half is-offset-one-quarter addnew"  expanded>
        Add new
      </b-button>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Main',
  components: {
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    ...mapActions([
      'updateSoundboards'
    ])
  }
}
</script>

<style scoped>
.title{
 border-color: black;
 color: white;
 background-color: #2f3f53;
}

.addnew{
  color: white;
  background-color: #2f3f53;
  display: flex;
}

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
  .title {
    margin-bottom: 0.2em;
  }
  .section {
    padding: 0.5em;
  }
  .button {
    margin-top: 1em;
  }
}
</style>
