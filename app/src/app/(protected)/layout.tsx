import DashboardNavbar from "@/shared/components/DashboardNavbar/DashboardNavbar";
import { auth } from "@clerk/nextjs/server";

async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    await auth.protect();

    return (
        <div className="flex flex-row gap-4 max-md:flex-col">
            <DashboardNavbar />
            <div className="grow">{children}</div>
        </div>
    );
}

export default ProtectedLayout;