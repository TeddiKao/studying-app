import api from "@/lib/axiosApi";

async function sendFileToBackendForNoteImport(formData: FormData) {
	try {
		const response = await api.post("notes/upload_note", formData);
		console.log(response);
	} catch (error) {
		console.error(error);
	}
}

export { sendFileToBackendForNoteImport };