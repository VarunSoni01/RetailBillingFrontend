import axios from "axios";


export const lastestOrders = async () => {
    return await axios.get("http://localhost:5000/api/orders", { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } });
}

export const createOrder = async (order) => {
    return await axios.post("http://localhost:5000/api/orders/add", order, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } });
}