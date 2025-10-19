import { SignedIn } from "@clerk/nextjs";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
	return (
        <SignedIn>
            {children}
        </SignedIn>
    );
}

export default ProtectedLayout;