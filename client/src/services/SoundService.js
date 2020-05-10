import Api from '@/services/Api'

export default {
  streamSound (_id, filename) {
    return Api().get('stream-sound', { params: { _id: _id, filename: filename }, withCredentials: true })
  },
  postSounds (formdata, _id) {
    return Api().post('post-sound', formdata, { params: { parent_id: _id }, withCredentials: true })
  }
}
