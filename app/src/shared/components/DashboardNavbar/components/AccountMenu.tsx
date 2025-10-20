"use client";

import {
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";
import { LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";

function AccountMenu() {
	return (
		<DropdownMenuContent
			side="right"
			sideOffset={8}
			align="start"
			alignOffset={0}
			className="border-gray-200"
		>
			<DropdownMenuItem asChild className="flex flex-row hover:cursor-pointer">
				<Link href="/profile">
					<UserIcon />
					<p className="text-sm">Profile</p>
				</Link>
			</DropdownMenuItem>

			<DropdownMenuItem className="flex flex-row hover:cursor-pointer">
				<LogOutIcon className="stroke-red-500" />
				<div className="text-red-500">
					<SignOutButton />
				</div>
			</DropdownMenuItem>
		</DropdownMenuContent>
	);
}

export default AccountMenu;
