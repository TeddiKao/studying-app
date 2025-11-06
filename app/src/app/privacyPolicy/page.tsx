function PrivacyPolicyPage() {
	return (
		<div className="prose mx-auto p-6">
			<h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
			<p>
				<strong>Last updated:</strong> November 6, 2025
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-3">1. Introduction</h2>
			<p>
				StudyCentre ("we", "our", or "the Service") respects your
				privacy and is committed to protecting it. This Privacy Policy
				explains how we collect, use, and share information when you use
				the Service.
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-3">2. Information We Collect</h2>
			<ul>
				<li>
					<strong>Account Information:</strong> Email address, name,
					profile image, and other details you provide during account
					creation via Clerk.
				</li>
				<li>
					<strong>User Content:</strong> Notes, highlights,
					flashcards, and other content you create within the app.
				</li>
				<li>
					<strong>Technical & Usage Data:</strong> IP address, device
					information, browser type, and usage events collected via
					logs or analytics tools.
				</li>
			</ul>

			<h2 className="text-2xl font-semibold mt-6 mb-3">3. How We Use Your Information</h2>
			<ul>
				<li>To provide and maintain the Service.</li>
				<li>To improve and personalize your experience.</li>
				<li>
					To communicate with you, such as sending updates or support
					messages.
				</li>
			</ul>

			<h2 className="text-2xl font-semibold mt-6 mb-3">4. Sharing Your Information</h2>
			<p>
				We do not sell or rent your personal data. We may share
				information with third-party services only to operate the
				Service (e.g., Clerk, analytics providers), and only to the
				extent necessary.
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-3">5. Data Retention</h2>
			<p>
				We retain your personal data and user content for as long as
				your account exists or as needed to provide the Service. You may
				request deletion of your account and associated data at any
				time.
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-3">6. Your Rights</h2>
			<p>
				Depending on your location, you may have rights to access,
				correct, or delete your personal information. Contact us to
				exercise these rights.
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-3">7. Security</h2>
			<p>
				We implement reasonable measures to protect your data from
				unauthorized access or disclosure. However, no system is
				completely secure, and we cannot guarantee absolute security.
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-3">8. Changes to This Privacy Policy</h2>
			<p>
				We may update this Privacy Policy from time to time. Changes
				will be posted on this page. Continued use of the Service after
				changes constitutes acceptance of the updated policy.
			</p>

			<h2 className="text-2xl font-semibold mt-6 mb-3">9. Contact Us</h2>
			<p>
				If you have questions about this Privacy Policy, you can contact
				us at: <br />
				<strong>Email:</strong>{" "}
				<a
					href="mailto:support@studycentre.com"
					className="text-blue-600 underline"
				>
					support@studycentre.com
				</a>
			</p>
		</div>
	);
}

export default PrivacyPolicyPage;