import Api from '@/services/Api'

export default {
  retrieveSoundboards () {
    return Api().get('get-soundboards', { withCredentials: true })
  },
  uploadSoundboard (name) {
    return Api().post('post-soundboard', name, { withCredentials: true })
  },
  deleteSoundboard (_id) {
    return Api().post('delete-soundboard', _id, { withCredentials: true })
  }
}
