import axios from "axios";
import { ApiPaths } from "../utils/constants";

export const lastestOrders = async () => {
    return await axios.get(`${ApiPaths.BASE_URL}/orders`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } });
}

export const createOrder = async (order) => {
    // first argument is url, second is data, third is config
    return await axios.post(`${ApiPaths.BASE_URL}/orders/add`, order, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } });

}

export const deleteOrder = async (orderId) => {
    return await axios.delete(`${ApiPaths.BASE_URL}/orders/delete/${orderId}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } });
}