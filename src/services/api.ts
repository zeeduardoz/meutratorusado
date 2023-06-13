import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.BASE_API}/tratorapi`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export { api }
