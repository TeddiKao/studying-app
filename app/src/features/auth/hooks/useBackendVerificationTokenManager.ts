"use client";

import { useEffect } from "react";
import { useBackendVerificationTokenStore } from "../stores/backendToken";
import { useAuth } from "@clerk/nextjs";

function useBackendVerificationTokenManager() {
	const { getToken } = useAuth();
	const { updateTokenGetter, clearTokenGetter } = useBackendVerificationTokenStore();

	useEffect(() => {
		updateTokenGetter(() => getToken({ template: "backend" }));

		return () => {
			clearTokenGetter();
		}
	}, [getToken]);
}

export default useBackendVerificationTokenManager;