import { create } from "zustand";

type BackendVerificationTokenManagerStore = {
	getToken: (() => Promise<string | null>) | null;
	updateTokenGetter: (tokenGetter: () => Promise<string | null>) => void;
	clearTokenGetter: () => void;
}

const useBackendVerificationTokenStore = create<BackendVerificationTokenManagerStore>((set) => ({
	getToken: null,
	updateTokenGetter: (tokenGetter) => {
		set({ getToken: tokenGetter })
	},
	clearTokenGetter: () => {
		set({ getToken: null })
	}
}))

export { useBackendVerificationTokenStore };