import Api from '@/services/Api'

export default {
  register (credentials) {
    console.log('Authentication service log - register.')
    return Api().post('register', credentials)
  },
  login (credentials) {
    console.log('Authentication service log - login.')
    return Api().post('login', credentials)
  }
}
