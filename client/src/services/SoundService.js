import Api from '@/services/Api'

export default {
  getSoundsFromServer (_id) {
    return Api().get('get-sounds', { params: { _id: _id }, withCredentials: true })
  },
  postSounds (formdata) {
    return Api().post('post-sounds', formdata, { withCredentials: true })
  }
}
