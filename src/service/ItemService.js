import axios from "axios";
import { ApiPaths } from "../utils/constants";

export const addItem = async (item) => {
    return await axios.post(`${ApiPaths.BASE_URL}/admin/addItem`, item, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
}

export const deleteItem = async (itemId) => {
    return await axios.delete(`${ApiPaths.BASE_URL}/admin/item/delete/${itemId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
}

export const fetchItem = async () => {
    return await axios.get(`${ApiPaths.BASE_URL}/items`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
}
