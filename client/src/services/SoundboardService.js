import Api from '@/services/Api'

export default {
  soundboard () {
    return Api().get('retrieve-soundboards', { headers: { Cookie: 'jwt' } })
  }
}
