import { getTokenForBackendVerification } from "@/shared/utils/jwt";
import axios from "axios";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	timeout: 5000,
})

api.interceptors.request.use(
	async (config) => {
		const token = await getTokenForBackendVerification();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
)

export default api;