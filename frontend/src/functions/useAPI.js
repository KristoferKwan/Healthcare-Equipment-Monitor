import { useAsync, useAsyncFn } from 'react-use'
import axios from 'axios'

const API_URL_PREFIX = '/api'

export const useHospitalInfo = id => {
  let url = `${API_URL_PREFIX}/hospital/${id}`
  return useAsync(async () => {
    let { data } = await axios.get(url)
    return data
  })
}

export const useSignIn = ({ username, password }) => {
  let url = `${API_URL_PREFIX}/user/login`
  return useAsyncFn(async () => {
    let { data } = await axios.post(url, { username, password })
    return data
  }, [username, password])
}

export const useSignUp = ({ hospitalId, username, password }) => {
  let url = `${API_URL_PREFIX}/user/signup`
  return useAsyncFn(async () => {
    let { data } = await axios.post(url, { hospitalId, username, password })
    return data
  }, [hospitalId, username, password])
}

export const useAllHospitals = () => {
  let url = `${API_URL_PREFIX}/hospital/info`
  return useAsync(async () => {
    let { data } = await axios.get(url)
    return data
  })
}
