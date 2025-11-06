import { SignIn } from "@clerk/nextjs";

function SignInPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen w-full">
			<SignIn />
			<div className="flex flex-col items-center justify-center mt-4 text-sm">
				<span>
					<span>By signing up or logging in, you agree to our </span>
					<a href="/terms" className="text-gray-500 font-bold">
						Terms of Service.
					</a>
				</span>
			</div>
		</div>
	);
}

export default SignInPage;
