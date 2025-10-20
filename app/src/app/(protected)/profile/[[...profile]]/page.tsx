import { UserProfile } from "@clerk/nextjs";

function UserProfilePage() {
    return <UserProfile appearance={{
        elements: {
            rootBox: {
                width: "100%",
                maxWidth: "none",
            },

            cardBox: {
                width: "100%",
                maxWidth: "none",
            }
        }
    }} />
}

export default UserProfilePage;