import { create } from "zustand";

type BackendVerificationTokenManager = {
	getToken: (() => Promise<string | null>) | null;
	updateTokenGetter: (tokenGetter: () => Promise<string | null>) => void;
}

const useBackendVerificationTokenStore = create<BackendVerificationTokenManager>((set) => ({
	getToken: null,
	updateTokenGetter: (tokenGetter) => {
		set({ getToken: tokenGetter })
	}
}))

export { useBackendVerificationTokenStore };