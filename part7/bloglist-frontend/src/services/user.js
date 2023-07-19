import axios from "axios"

const getAll = async () => {
    const response = await axios.get("http://localhost:3003/api/users")
    return response.data
}

const getOne = async (id) => {
    const response = await axios.get(`http://localhost:3003/api/users/${id}`)
    console.log(response.data)
    return response.data
}

export default { getAll, getOne }