import api from "@/lib/axiosApi";

async function sendFileToBackendForNoteImport(file: string) {
	try {
		const response = await api.post("upload_note");
		console.log(response);
	} catch (error) {
		console.error(error);
	}
}

export { sendFileToBackendForNoteImport };