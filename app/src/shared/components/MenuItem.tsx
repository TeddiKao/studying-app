type MenuItemProps = {
	onClick: () => void;
	children: React.ReactNode;
};

function MenuItem({ onClick, children }: MenuItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="text-left w-full rounded-sm px-2 py-1.5 text-sm outline-none 
                 hover:bg-accent hover:text-accent-foreground
                 focus:bg-accent focus:text-accent-foreground"
		>
			{children}
		</button>
	);
}

export default MenuItem;
