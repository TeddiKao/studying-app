"use client";

import { useImportFlowStore } from "../../stores/importFlow";
import NoteImportScreen from "./screens/NoteImportScreen";

function NoteImportDialog() {
	const { currentStage } = useImportFlowStore();

	switch (currentStage) {
		case "fileUpload":
			return <NoteImportScreen />;
	}
}

export default NoteImportDialog;