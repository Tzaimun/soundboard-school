// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import SoundboardService from './services/SoundboardService'
import SoundService from './services/SoundService'
Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Buefy)

library.add(
  faTrash,
  faPlus
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    soundboards: {},
    sounds: {}
  },
  mutations: {
    uploadSoundboard (name) {
      SoundboardService.uploadSoundboard(name)
    }
  },
  actions: {
    async updateSoundboards ({ state }, payload) {
      await SoundboardService.uploadSoundboard({name: payload})
      state.soundboards = await SoundboardService.retrieveSoundboards()
    },
    async deleteSoundboard ({ state }, payload) {
      await SoundboardService.deleteSoundboard({_id: payload})
      state.soundboards = await SoundboardService.retrieveSoundboards()
    },
    async getSoundFromServer ({ state }, _id, filename) {
      console.log(_id, filename)
      const response = await SoundService.getSoundFromServer(_id, filename)
      console.log(response)
    },
    async getSoundboardsFromApi ({ state }) {
      state.soundboards = await SoundboardService.retrieveSoundboards()
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
