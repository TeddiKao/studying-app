import { SignIn } from "@clerk/nextjs";

function SignInPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <SignIn />
        </div>
    )
}

export default SignInPage;