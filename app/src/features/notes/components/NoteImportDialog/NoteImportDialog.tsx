import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@radix-ui/react-dialog";

function NoteImportDialog() {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Import note</DialogTitle>
				<DialogDescription>
					Import a handwritten note. More options like uploading files
					and importing from third-party apps will be coming soon.
					soon.
				</DialogDescription>
			</DialogHeader>

			<Tabs>
				<TabsList>
					<TabsTrigger value="uploadFile">Upload file</TabsTrigger>
				</TabsList>

				<TabsContent value="handwriting">
					<Input type="file" />
				</TabsContent>
			</Tabs>
		</DialogContent>
	);
}

export default NoteImportDialog;
