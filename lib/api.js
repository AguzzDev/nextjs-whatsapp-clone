import axios from "axios"
import { API_URL } from "utils/apiUrl"

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})

export default API
