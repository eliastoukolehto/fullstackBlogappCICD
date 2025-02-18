import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  //console.log('request: '+ JSON.stringify(response.data))
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async objectToUpdate => {
  //console.log('object:' + JSON.stringify(objectToUpdate))
  const response = await axios.put(`${baseUrl}/${objectToUpdate.id}`, objectToUpdate)
  return response.data
}

const remove = async objectToDelete => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${objectToDelete.id}`, config)
  return response.data
}

export default { getAll, create, setToken, update, remove }