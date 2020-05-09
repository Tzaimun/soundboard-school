import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials, { withCredentials: true })
  },
  login (credentials) {
    return Api().post('login', credentials, { withCredentials: true })
  }
}
