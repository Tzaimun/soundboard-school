// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import SoundboardService from './services/SoundboardService'
Vue.config.productionTip = false

Vue.use(Buefy, axios)
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    soundboards: {}
  },
  mutations: {
    uploadSoundboard (name) {
      SoundboardService.uploadSoundboard(name)
    }
  },
  actions: {
    async updateSoundboards ({ commit, state }, payload) {
      await SoundboardService.uploadSoundboard({name: payload})
      const response = await SoundboardService.retrieveSoundboards()
      console.log(response)
      state.soundboards = response
    },
    async getSoundboardsFromApi ({ state }) {
      try {
        const response = await SoundboardService.retrieveSoundboards()
        //  console.log(response.data)
        state.soundboards = response
      } catch (err) {
        console.log('Failed to get soundboards from api ' + err)
      }
    }
  },
  getters: {
    getSoundboards: state => {
      return state.soundboards
    },
    getSoundboardById: state => id => {
      return state.soundboards.find(soundboard => soundboard.id === id)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  components: { App },
  template: '<App/>'
})
