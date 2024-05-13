import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async ({ title, author, url }) => {
  const response = await axios.post(
    baseUrl,
    { title, author, url },
    {
      headers: { Authorization: token },
    },
  )
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, {
    headers: { Authorization: token },
  })
  return response.data
}

export default { getAll, create, update }
