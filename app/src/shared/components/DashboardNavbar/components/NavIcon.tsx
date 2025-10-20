"use client";

import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
    TooltipProvider
} from "@/components/ui/tooltip";

type NavIconProps = {
	children: React.ReactNode;
	tooltip: string;
};

function NavIcon({ children, tooltip }: NavIconProps) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>

				<TooltipContent>
					<p>{tooltip}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

export default NavIcon;
