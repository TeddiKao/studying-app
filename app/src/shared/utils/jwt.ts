import { useBackendVerificationTokenStore } from "@/features/auth/stores/backendToken";

async function getTokenForBackendVerification() {
	const getToken = useBackendVerificationTokenStore.getState().getToken;
	if (!getToken) return null;

	try {
		const token = await getToken();
		return token;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export { getTokenForBackendVerification };
