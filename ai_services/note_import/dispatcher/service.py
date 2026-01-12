from fastapi import UploadFile
from ai_services.note_import.dispatcher.file_type_detector import detect_file_type
from ai_services.note_import.ocr.service import handle_note_import_by_ocr
from ai_services.note_import.dispatcher.exceptions.file_exceptions import UnsupportedFileTypeError

async def handle_note_import(file: UploadFile):
	file_type = await detect_file_type(file)

	if file_type == "image/jpeg" or file_type == "image/png":
		return await handle_note_import_by_ocr(file)
	else:
		raise UnsupportedFileTypeError(file_type)