import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { ConvexClientProvider } from "./ConvexClientProvider";

import { Inter } from "next/font/google"
import useBackendVerificationTokenManager from "@/features/auth/hooks/useBackendVerificationTokenManager";
import TokenManagerProvider from "@/features/auth/components/TokenManagerProvider";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Study app",
	description: "An app for managing and creating notes",
};

function RootLayout({ children }: { children: React.ReactNode }) {
	useBackendVerificationTokenManager();

	return (
		<html className="h-full" lang="en">
			<body className={`${inter.className} h-full overflow-hidden`}>
				<ClerkProvider>
					<ConvexClientProvider>
                        <TokenManagerProvider>
							{children}
						</TokenManagerProvider>
                    </ConvexClientProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}

export default RootLayout;
