import RootLayout from "@/app/layout";

function ProfileLayout({ children }: { children: React.ReactNode }) {
	return (
        <RootLayout>
            {children}
        </RootLayout>
    )
}

export default ProfileLayout;