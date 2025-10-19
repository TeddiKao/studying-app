import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
	title: "Study app",
	description: "An app for managing and creating notes",
};

function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body>
                    {children}
                </body>
			</html>
		</ClerkProvider>
	);
}

export default RootLayout;