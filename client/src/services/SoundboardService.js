import Api from '@/services/Api'

export default {
  retrieveSoundboards () {
    return Api().get('retrieve-soundboards', { withCredentials: true })
  },
  uploadSoundboard (name) {
    return Api().post('upload-soundboard', name, { withCredentials: true })
  },
  deleteSoundboard (_id) {
    return Api().post('delete-soundboard', _id, { withCredentials: true })
  }
}
