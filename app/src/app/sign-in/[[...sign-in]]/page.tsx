import { SignIn } from "@clerk/nextjs";

function SignInPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen">
            <SignIn />
        </div>
    )
}

export default SignInPage;