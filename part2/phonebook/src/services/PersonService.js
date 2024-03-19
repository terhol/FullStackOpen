import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const addPerson = async (newPerson) => {
  const response = await axios.post(baseURL, newPerson)
  return response.data
}

const deletePerson = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`)
  return response.data
}

const updateNumber = async (id, updatedPerson) => {
  const response = await axios.put(`${baseURL}/${id}`, updatedPerson)
  return response.data
}

export { getAll, addPerson, deletePerson, updateNumber }
