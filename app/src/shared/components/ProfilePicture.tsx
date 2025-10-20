"use client";

import { useUser } from "@clerk/nextjs";

type ProfilePictureProps = {
	className?: string;
};

function ProfilePicture({ className = "" }: ProfilePictureProps) {
	const { user } = useUser();

	if (!user) return null;

	return (
		<img
			src={user.imageUrl}
			alt={`${user.fullName}'s profile picture`}
            className={className}
		/>
	);
}

export default ProfilePicture;
