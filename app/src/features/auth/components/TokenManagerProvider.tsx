"use client";

import useBackendVerificationTokenManager from "../hooks/useBackendVerificationTokenManager";

function TokenManagerWrapper() {
	useBackendVerificationTokenManager();

	return <></>;
}

export default TokenManagerWrapper;
