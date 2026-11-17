import axios from "axios";
import {API_BASE_URL} from "../util/constants.js";

export const addUser = async (user) => {
   return await axios.post(`${API_BASE_URL}/admin/register`, user, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const deleteUser = async (id) => {
    return await axios.delete(`${API_BASE_URL}/admin/users/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const fetchUsers = async () => {
    return await axios.get(`${API_BASE_URL}/admin/users`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}