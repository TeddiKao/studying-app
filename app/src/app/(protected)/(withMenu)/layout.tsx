import AppSidebar from "@/shared/components/AppSidebar/AppSidebar";
import { auth } from "@clerk/nextjs/server";

async function ProtectedLayout({ children }: { children: React.ReactNode }) {
	await auth.protect();

	return (
		<div className="flex flex-row gap-4 max-md:flex-col">
			<AppSidebar />
			<div className="grow pr-4 pt-4">{children}</div>
		</div>
	);
}

export default ProtectedLayout;
