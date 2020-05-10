import Api from '@/services/Api'

export default {
  getSoundsFromServer (_id) {
    return Api().get('get-sounds', { params: { _id: _id }, withCredentials: true })
  },
  postSounds (formdata, _id) {
    return Api().post('post-sound', formdata, { params: { parent_id: _id }, withCredentials: true })
  }
}
