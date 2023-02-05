import axios from 'axios'

const url = "http://localhost:3001/persons";

const getAll = () => {
    const res = axios.get(url)
    return res.then(res => res.data);
}

const create = (newObj) => {
    const req = axios.post(url, newObj)
    return req.then(res => res.data);
}

const update = (id, newObj) => {
    const req = axios.put(`${url}/${id}`, newObj)
    return req.then(res => res.data);
}

const remove = (id) => {
    const req = axios.delete(`${url}/${id}`)
    return req
}
export default { getAll, create, update, remove }