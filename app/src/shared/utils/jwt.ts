import { auth } from "@clerk/nextjs/server";

async function getTokenForBackendVerification() {
	try {
		const authInfo = await auth();

		return authInfo.getToken({ template: "backend" });
	} catch (error) {
		console.error("Failed to get token for backend verification", error);
		return null;
	}
}

export { getTokenForBackendVerification };
