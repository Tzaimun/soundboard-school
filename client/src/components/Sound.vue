<template>
  <section class="section">
    <h1> {{ name }} </h1>
    <h2> {{ path }} </h2>
  </section>
</template>

<script>
export default {
  name: 'Sound',
  props: ['name', 'sound', 'path'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
