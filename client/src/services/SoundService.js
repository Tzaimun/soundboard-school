import Api from '@/services/Api'

export default {
  getSoundsFromServer (_id) {
    console.log(_id)
    return Api().get('get-sounds', { params: { _id: _id }, withCredentials: true })
  }
}
