from fastapi import Header, APIRouter, Form, UploadFile
from ai_services.note_import.ocr.model import get_text_from_image
from typing import Annotated
from ai_services.note_import.ocr.parser import parse_blocks_from_text

router = APIRouter(prefix="/notes")

@router.post("/upload_note")
async def upload_note(imageFile: Annotated[UploadFile, Form()]):
	text = await get_text_from_image(imageFile)
	blocks = parse_blocks_from_text(text)

	return {
		"success": True,
		"blocks": blocks
	}