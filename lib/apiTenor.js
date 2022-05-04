import axios from "axios"

const APITENOR = axios.create({
  baseURL: "https://g.tenor.com/v1",
})

export default APITENOR
