import axios from "axios";
import { ApiPaths } from "../utils/constants";

export const fetchDashboardData = async () => {
    return await axios.get(`${ApiPaths.BASE_URL}/dashboard`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` } });
}