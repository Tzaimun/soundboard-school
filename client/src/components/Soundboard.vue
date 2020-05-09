<template>
  <div>
    <soundboard v-for="soundboard in soundboards" v-bind:key="soundboard._id" v-bind:name="soundboard.name" v-bind:sounds="soundboard.sounds"></soundboard>
  </div>
</template>

<script>
import Sounds from './SoundListItem'

export default {
  name: 'Main',
  components: {
    Sounds
  },
  data () {
    return {
      soundboards: [
        {
          sounds: [
            {
              _id: '5ea44e1a58d7ea45f8acc4e2',
              name: 'nope meme sound effect.mp3',
              path: 'uploads\\951808038ddf7f093d33852f173c74e2',
              parent_id: '5ea44e0958d7ea45f8acc4e1'
            },
            {
              _id: '5ea44e1c58d7ea45f8acc4e3',
              name: 'nope meme sound effect.mp3',
              path: 'uploads\\2cba7d6a85792f8e95cb6eeafd51f157',
              parent_id: '5ea44e0958d7ea45f8acc4e1'
            }
          ],
          _id: '5ea44e0958d7ea45f8acc4e1',
          name: 'Test Soundboard'
        }
      ]
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
