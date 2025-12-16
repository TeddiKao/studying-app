import useBackendVerificationTokenManager from "../hooks/useBackendVerificationTokenManager";

function TokenManagerProvider({ children }: { children: React.ReactNode }) {
	useBackendVerificationTokenManager();
	
	return <>{children}</>;
}

export default TokenManagerProvider;