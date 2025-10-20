import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";
import { LogOutIcon, UserIcon } from "lucide-react";

function AccountMenu() {
	return (
        <DropdownMenuContent side="right" sideOffset={8} align="start" alignOffset={0} className="border-gray-200">
            <DropdownMenuItem className="flex flex-row">
                <UserIcon />
                <p className="text-sm">Profile</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-row">
                <LogOutIcon />
                <SignOutButton />
            </DropdownMenuItem>
        </DropdownMenuContent>
    );
}

export default AccountMenu;