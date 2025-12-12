import { auth } from "@clerk/nextjs/server";

async function getTokenForBackendVerification() {
	const authInfo = await auth();
	
	return authInfo.getToken({ template: "backend" });
}

export { getTokenForBackendVerification };