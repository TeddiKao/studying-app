import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import NotebookIcon from "@/shared/components/icons/Notebook";

function EmptyNotebooksDisplay() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<NotebookIcon className="fill-gray-950" />
				</EmptyMedia>
                <EmptyTitle>No notebooks yet</EmptyTitle>
                <EmptyDescription>You do not have any notebooks yet. Get started by creating one.</EmptyDescription>
			</EmptyHeader>

            <EmptyContent>
                <div className="flex flex-row gap-2">
                    <Button type="button">Create notebook</Button>
                </div>
            </EmptyContent>
		</Empty>
	);
}

export default EmptyNotebooksDisplay;
