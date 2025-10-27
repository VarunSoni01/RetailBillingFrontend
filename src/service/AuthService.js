import axios from "axios";
import { ApiPaths } from "../utils/constants";


export const login = async (data) => {
    return await axios.post(`${ApiPaths.BASE_URL}/login`, data);
}


