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
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { sendFileToBackendForNoteImport } from "../../api/upload";
import { useImportFlowStore } from "../../stores/importFlow";

function NoteImportDialog() {
	const { isOpen, openDialog, closeDialog } = useNoteImportDialogStore();
	const {
		previewFileType,
		updatePreviewFileType,
		clearPreviewFileType,

		previewFileUrl,
		updatePreviewFileUrl,
		clearAndRevokePreviewFileUrl,

		previewFile,
		updatePreviewFile,
		clearPreviewFile,
	} = useFileUploadBoxStore();

	const { currentStage, updateCurrentStage } = useImportFlowStore();

	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		return () => {
			clearAndRevokePreviewFileUrl();
		};
	}, [clearAndRevokePreviewFileUrl]);

	function handleFileUploadBoxClick() {
		fileInputRef.current?.click();
	}

	function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		const fileUrl = URL.createObjectURL(file);

		updatePreviewFileType(file.type);
		updatePreviewFileUrl(fileUrl);
		updatePreviewFile(file);
	}

	function clearFileInput() {
		clearPreviewFileType();
		clearAndRevokePreviewFileUrl();
		clearPreviewFile();
	}

	async function handleNoteUpload() {
		if (!previewFile) return;

		const formData = new FormData();
		formData.append("file", previewFile);
		
		await sendFileToBackendForNoteImport(formData);

		updateCurrentStage("fileInfoInput");
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
						soon.
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
							previewFileType?.startsWith("image") ? (
								<div className="flex flex-col gap-2">
									<img
										src={previewFileUrl}
										alt="Preview of uploaded handwritten note"
									/>
									<Button
										onClick={clearFileInput}
										className="hover:cursor-pointer"
										type="button"
										variant="outline"
									>
										Clear image
									</Button>
									<Button
										className="hover:cursor-pointer"
										type="button"
										onClick={handleNoteUpload}
									>
										Import note
									</Button>
								</div>
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
									accept="image/*"
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