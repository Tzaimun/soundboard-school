import axios from 'axios'

export default () => {
  console.log('hey')
  return axios.create({
    baseURL: `http://localhost:8081/`
  })
}
