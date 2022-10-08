import axios from 'axios';
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, personObject) => {
    const request = axios.put(`${baseUrl}/${id}`, personObject);
    return request.then((response) => response.data);
};

const remove = (id) => {
    axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, remove };