import axios, { CanceledError } from "axios";

export { CanceledError };

const baseURL = "http://localhost:3000";

const apiClient = axios.create({ baseURL });

export default apiClient;
