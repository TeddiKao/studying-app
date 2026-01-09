from fastapi import Header, APIRouter, Form, UploadFile
from ai_services.note_import.ocr.model import get_text_from_image
from typing import Annotated

router = APIRouter(prefix="/notes")

@router.post("/upload_note")
async def upload_note(imageFile: Annotated[UploadFile, Form()]):
	text = await get_text_from_image(imageFile)

	return {
		"success": True,
		"text": text
	}