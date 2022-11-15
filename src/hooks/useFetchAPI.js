import axios from 'axios'
import { BASE_API_URL } from '../helpers/constants'

export default function useFetchAPI () {
  return ({ urls = [BASE_API_URL], ...config }) => {
    return new Promise((resolve, reject) => {
      axios.all(urls.map((endpoint) => axios.get(endpoint))).then(res => resolve(res)).catch((err) => reject(err))
    })
  }
}
