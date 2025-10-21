import axios from "axios";


export const lastestOrders = async () => {
    return await axios.get("http://localhost:5000/api/orders", { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } });
}

export const createOrder = async (order) => {
    // first argument is url, second is data, third is config
    return await axios.post("http://localhost:8080/api/v1.0/orders/add", order, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } });

}

export const deleteOrder = async (orderId) => {
    return await axios.delete("http://localhost:8080/api/v1.0/orders/delete/" + orderId, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } });
}