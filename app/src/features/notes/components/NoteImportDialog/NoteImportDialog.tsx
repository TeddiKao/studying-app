"use client";

import { useImportFlowStore } from "../../stores/importFlow";
import NoteImportScreen from "./screens/NoteImportScreen";
import NoteInfoScreen from "./screens/NoteInfoScreen";

function NoteImportDialog() {
	const { currentStage } = useImportFlowStore();

	switch (currentStage) {
		case "fileUpload":
			return <NoteImportScreen />;

		case "fileInfoInput":
			return <NoteInfoScreen />;
	}
}

export default NoteImportDialog;