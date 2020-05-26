import Api from '@/services/Api'
import axios from 'axios'

const audioInstance = axios.create({
  baseURL: `http://localhost:8081/`
})
audioInstance.defaults.headers.get['Content-Type'] = 'audio/mpeg'

export default {
  streamSound (_id, filename) {
    return audioInstance.get('stream-sound', { params: { _id: _id, filename: filename }, withCredentials: true, responseType: 'stream' })
  },
  postSounds (formdata, _id) {
    return Api().post('post-sound', formdata, { params: { parent_id: _id }, withCredentials: true })
  }
}
