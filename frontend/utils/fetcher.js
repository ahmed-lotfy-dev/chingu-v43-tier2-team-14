import axios from "axios"

const fetcher = async (url, params) => {
  const f = axios.create({
    baseURL: url,
    withCredentials: true,
  }, { ...params })
}