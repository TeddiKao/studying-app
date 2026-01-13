import { create } from "zustand"

type ImportFlowStages = "fileUpload" | "fileInfoInput"

type ImportFlowStore = {
	currentStage: "fileUpload" | "fileInfoInput",
	updateCurrentStage: (stage: ImportFlowStages) => void,
}

const useImportFlowStore = create<ImportFlowStore>((set) => ({
	currentStage: "fileUpload",
	updateCurrentStage: (stage: ImportFlowStages) => set({ currentStage: stage }),
}))

export { useImportFlowStore }