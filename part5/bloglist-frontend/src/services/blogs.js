import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const resp = await axios.post(baseUrl, newObject, config)
  return resp.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create }