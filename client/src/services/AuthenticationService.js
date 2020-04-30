import axios from 'axios'

const HTTP = axios.create({
  baseURL: `http://localhost:8081/`
})

export default {
  register (credentials) {
    return HTTP.post('register', credentials, { withCredentials: true })
  },
  login (credentials) {
    return HTTP.post('login', credentials, { withCredentials: true })
  }
}
