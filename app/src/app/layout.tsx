import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { ConvexClientProvider } from "./ConvexClientProvider";

export const metadata: Metadata = {
	title: "Study app",
	description: "An app for managing and creating notes",
};

function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-gray-100">
				<ClerkProvider>
					<ConvexClientProvider>
                        {children}
                    </ConvexClientProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}

export default RootLayout;
