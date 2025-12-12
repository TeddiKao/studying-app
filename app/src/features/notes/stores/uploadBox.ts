import { create } from "zustand";

type FileUploadBoxStore = {
	previewFileType: string | null;
	previewFileUrl: string | null;

	updatePreviewFileType: (fileType: string) => void;
	clearPreviewFileType: () => void;

	updatePreviewFileUrl: (url: string) => void;
	clearAndRevokePreviewFileUrl: () => void;
};

const useFileUploadBoxStore = create<FileUploadBoxStore>((set, get) => ({
	previewFileType: null,

	updatePreviewFileType: (fileType: string) =>
		set({ previewFileType: fileType }),
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
