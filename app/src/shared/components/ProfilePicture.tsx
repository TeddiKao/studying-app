"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";

type ProfilePictureProps = {
	className?: string;
};

function ProfilePicture({ className = "" }: ProfilePictureProps) {
	const { user } = useUser();

	if (!user) return null;

	return (
		<Image
			src={user.imageUrl}
			alt={`${user.fullName}'s profile picture`}
            className={className}
			width={32}
			height={32}
		/>
	);
}

export default ProfilePicture;
