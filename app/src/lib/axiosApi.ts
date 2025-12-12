import { getTokenForBackendVerification } from "@/shared/utils/jwt";
import axios from "axios";

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!baseApiUrl) {
	throw new Error("NEXT_PUBLIC_API_URL is not set or defined");
}

const api = axios.create({
	baseURL: baseApiUrl,
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