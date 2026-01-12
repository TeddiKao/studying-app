from fastapi import Header, APIRouter, Form, UploadFile
from ai_services.note_import.ocr.model import get_text_from_image
from typing import Annotated

from ai_services.note_import.ocr.parser import parse_blocks_from_text
from ai_services.note_import.dispatcher.service import handle_note_import

from ai_services.note_import.dispatcher.exceptions.file_exceptions import UnsupportedFileTypeError

router = APIRouter(prefix="/notes")

@router.post("/upload_note")
async def upload_note(file: Annotated[UploadFile, Form()]):
	try:
		blocks = await handle_note_import(file)

		return {
			"success": True,
			"blocks": blocks
		}
	except UnsupportedFileTypeError:
		return {
			"success": False,
			"message": "Unsupported file type"
		}