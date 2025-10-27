import axios from "axios";
import { ApiPaths } from "../utils/constants";

export const addCategory = async (category) => {
    return await axios.post(`${ApiPaths.BASE_URL}/admin/categories/addCategory`, category, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
}

export const deleteCategory = async (categoryId) => {
    return await axios.delete(`${ApiPaths.BASE_URL}/admin/categories/deleteCategory/${categoryId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
}

export const fetchCategories = async () => {
    return await axios.get(`${ApiPaths.BASE_URL}/categories`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
}
