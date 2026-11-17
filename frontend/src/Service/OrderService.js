import axios from "axios";
import {API_BASE_URL} from "../util/constants.js";

export const latestOrders = async () => {
    return await axios.get(`${API_BASE_URL}/orders/latest`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const createOrder = async (order) => {
    return await axios.post(`${API_BASE_URL}/orders`, order, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}

export const deleteOrder = async (id) => {
    return await axios.delete(`${API_BASE_URL}/orders/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
}