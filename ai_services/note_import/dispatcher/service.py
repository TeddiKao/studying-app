from fastapi import UploadFile
from ai_services.note_import.dispatcher.file_type_detector import detect_file_type
from ai_services.note_import.ocr.service import handle_note_import_by_ocr

async def handle_note_import(file: UploadFile):
	file_type = detect_file_type(file)

	if file_type == "image/jpeg" or file_type == "image/png" or file_type == "image/jpg":
		return await handle_note_import_by_ocr(file)