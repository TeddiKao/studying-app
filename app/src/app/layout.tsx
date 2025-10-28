import "./globals.css";
import "./editor.css";

import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { ConvexClientProvider } from "./ConvexClientProvider";

import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Study app",
	description: "An app for managing and creating notes",
};

function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
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
