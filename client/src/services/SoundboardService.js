import Api from '@/services/Api'

export default {
  retrieveSoundboards () {
    return Api().get('retrieve-soundboards', { withCredentials: true, crossDomain: true })
  }
}
