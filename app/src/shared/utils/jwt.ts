import { auth } from "@clerk/nextjs/server";

async function getToken() {
	const authInfo = await auth();
	
	return authInfo.getToken();
}

export { getToken };