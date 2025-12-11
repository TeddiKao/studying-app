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
import { FileIcon } from "lucide-react";
import { useFileUploadBoxStore } from "../../stores/uploadBox";
import { useRef } from "react";

function NoteImportDialog() {
	const { isOpen, openDialog, closeDialog } = useNoteImportDialogStore();
	const {
		previewFileType,
		updatePreviewFileType,
		clearPreviewFileType,
		previewFileUrl,
		updatePreviewFileUrl,
		clearPreviewFileUrl,
	} = useFileUploadBoxStore();

	const fileInputRef = useRef<HTMLInputElement>(null);

	function handleFileUploadBoxClick() {
		fileInputRef.current?.click();
	}

	function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		const fileUrl = URL.createObjectURL(file);

		updatePreviewFileType(file.type);
		updatePreviewFileUrl(fileUrl);
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
						{previewFileUrl ? (
							previewFileType === "image/png" ? (
								<img src={previewFileUrl} alt="Image preview" />
							) : (
								// TODO: Add file metadata info for other file types
								<></>
							)
						) : (
							<>
								<button
									type="button"
									onClick={handleFileUploadBoxClick}
									className="flex flex-col gap-2 hover:cursor-pointer items-center justify-center bg-gray-200 w-full rounded-lg py-6"
								>
									<FileIcon className="size-12 stroke-gray-500" />
									<p className="text-sm text-gray-500">
										Upload an image of your handwritten note
									</p>
								</button>

								<Input
									ref={fileInputRef}
									type="file"
									className="hidden"
									onChange={handleFileInputChange}
								/>
							</>
						)}
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}

export default NoteImportDialog;
