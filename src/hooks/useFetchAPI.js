import axios from 'axios'
import { BASE_API_URL } from '../helpers/constants'

export default function useFetchAPI () {
  return ({ url = BASE_API_URL, ...config }) => {
    const fetchUrl = url

    return new Promise((resolve, reject) => {
      axios.get(fetchUrl).then(res => resolve(res)).catch((err) => reject(err))
    })
  }
}
