import { create } from "zustand";

type FileUploadBoxStore = {
	previewImageUrl: string | null;

	updatePreviewImageUrl: (url: string) => void;
	clearPreviewImageUrl: () => void;
};

const useFileUploadBoxStore = create<FileUploadBoxStore>((set) => ({
	previewImageUrl: null,

	updatePreviewImageUrl: (url: string) => set({ previewImageUrl: url }),
	clearPreviewImageUrl: () => set({ previewImageUrl: null }),
}));

export { useFileUploadBoxStore };
