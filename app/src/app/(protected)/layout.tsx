import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    await auth.protect();

    return children;
}

export default ProtectedLayout;