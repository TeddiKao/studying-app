import { create } from "zustand";

type FileUploadBoxStore = {
	previewFileType: string | null;
	previewFileUrl: string | null;

	updatePreviewFileType: (fileType: string) => void;
	clearPreviewFileType: () => void;

	updatePreviewFileUrl: (url: string) => void;
	clearPreviewFileUrl: () => void;
};

const useFileUploadBoxStore = create<FileUploadBoxStore>((set) => ({
	previewFileType: null,

	updatePreviewFileType: (fileType: string) => set({ previewFileType: fileType }),
	clearPreviewFileType: () => set({ previewFileType: null }),

	previewFileUrl: null,
	updatePreviewFileUrl: (url: string) => set({ previewFileUrl: url }),
	clearPreviewFileUrl: () => set({ previewFileUrl: null }),
}));

export { useFileUploadBoxStore };
