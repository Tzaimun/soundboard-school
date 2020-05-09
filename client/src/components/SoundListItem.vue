<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Name: {{ name }}</h1>
      <h2 class="subtitle"> Sounds: {{ sounds.length }}</h2>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Main',
  props: ['name', 'sounds'],
  data () {
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
}
</style>
