import { useAsync } from 'react-use'
import axios from 'axios'

const API_URL_PREFIX = '/api'

export const useHospitalInfo = (i) => {
  let url = `${API_URL_PREFIX}/hospital/${i}`
  return useAsync(async () => {
    let { data } = await axios.get(url)
    return data
  })
}
