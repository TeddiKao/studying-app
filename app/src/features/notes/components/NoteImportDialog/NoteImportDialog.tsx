"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNoteImportDialogStore } from "../../stores/noteImportDialog";
import { FileIcon, ImageIcon } from "lucide-react";
import { useRef } from "react";

function NoteImportDialog() {
	const { isOpen, openDialog, closeDialog } = useNoteImportDialogStore();

	const fileInputRef = useRef<HTMLInputElement>(null);

	function handleFileUploadBoxClick() {
		fileInputRef.current?.click();
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				if (open) {
					openDialog();
				} else {
					closeDialog();
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Import note</DialogTitle>
					<DialogDescription>
						Import a handwritten note. More options like uploading
						files and importing from third-party apps will be coming
						soon. soon.
					</DialogDescription>
				</DialogHeader>

				<Tabs>
					<TabsList className="bg-transparent">
						<TabsTrigger
							className="rounded-none bg-transparent h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
							value="uploadFile"
						>
							Upload file
						</TabsTrigger>
					</TabsList>

					<TabsContent value="uploadFile">
						<button type="button" onClick={handleFileUploadBoxClick} className="flex flex-col gap-2 hover:cursor-pointer items-center justify-center bg-gray-200 w-full rounded-lg py-6">
							<FileIcon className="size-12 stroke-gray-500" />
							<p className="text-sm text-gray-500">Upload an image of your handwritten note</p>
						</button>

						<Input ref={fileInputRef} type="file" className="hidden" />
					</TabsContent>
				</Tabs>
				
			</DialogContent>
		</Dialog>
	);
}

export default NoteImportDialog;
