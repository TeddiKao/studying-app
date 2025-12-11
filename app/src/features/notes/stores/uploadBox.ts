import { create } from "zustand";

type FileUploadBoxStore = {
	previewImageUrl: string | null;

	setPreviewImageUrl: (url: string) => void;
	clearPreviewImageUrl: () => void;
};

const useFileUploadBoxStore = create<FileUploadBoxStore>((set) => ({
	previewImageUrl: null,

	setPreviewImageUrl: (url: string) => set({ previewImageUrl: url }),
	clearPreviewImageUrl: () => set({ previewImageUrl: null }),
}));

export { useFileUploadBoxStore };