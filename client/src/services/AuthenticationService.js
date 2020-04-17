import Api from '@/services/Api'

export default {
  register (credentials) {
    console.log('Authentication service log.')
    return Api().post('users', credentials)
  }
}
