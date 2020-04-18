import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    console.log('Authentication service log.')
    return Api().post('login', credentials)
  }
}
