import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getOne = async (id) => {
  const resp = await axios.get(`${baseUrl}/${id}`);
  return resp.data;
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  console.log(token);
  const resp = await axios.post(baseUrl, newObject, config);
  return resp.data;
};

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const resp = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config);
  return resp.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const resp = await axios.delete(`${baseUrl}/${id}`, config);
  return resp.data;
};

export default { getAll, setToken, create, update, remove, getOne };
