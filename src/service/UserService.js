import axios from "axios";
import { ApiPaths } from "../utils/constants";

export const addUser = async (user) => {
    return await axios.post(`${ApiPaths.BASE_URL}/admin/register`, user, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
}

export const deleteUser = async (userId) => {
    return await axios.delete(`${ApiPaths.BASE_URL}/admin/users/${userId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
}

export const fetchUsers = async () => {
    return await axios.get(`${ApiPaths.BASE_URL}/admin/users`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
}
