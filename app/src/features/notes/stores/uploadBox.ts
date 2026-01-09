import { create } from "zustand";

type FileUploadBoxStore = {
	previewFile: File | null;
	updatePreviewFile: (file: File) => void;
	clearPreviewFile: () => void;

	previewFileType: string | null;
	updatePreviewFileType: (fileType: string) => void;
	clearPreviewFileType: () => void;

	previewFileUrl: string | null;
	updatePreviewFileUrl: (url: string) => void;
	clearAndRevokePreviewFileUrl: () => void;
};

const useFileUploadBoxStore = create<FileUploadBoxStore>((set, get) => ({
	previewFile: null,
	updatePreviewFile: (file: File) => set({ previewFile: file }),
	clearPreviewFile: () => set({ previewFile: null }),

	previewFileType: null,
	updatePreviewFileType: (fileType: string) => set({ previewFileType: fileType }),
	clearPreviewFileType: () => set({ previewFileType: null }),

	previewFileUrl: null,
	updatePreviewFileUrl: (url: string) => set({ previewFileUrl: url }),
	clearAndRevokePreviewFileUrl: () => {
		const previewFileUrl = get().previewFileUrl;
		if (previewFileUrl) {
			URL.revokeObjectURL(previewFileUrl);
		}
		set({ previewFileUrl: null });
	},
}));

export { useFileUploadBoxStore };
