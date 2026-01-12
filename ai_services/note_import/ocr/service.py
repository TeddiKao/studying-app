from fastapi import UploadFile
from ai_services.note_import.ocr.model import get_text_from_image
from ai_services.note_import.ocr.parser import parse_blocks_from_text

async def handle_note_import_by_ocr(imageFile: UploadFile):
	text = await get_text_from_image(imageFile)
	blocks = parse_blocks_from_text(text)

	return {
		"success": True,
		"blocks": blocks
	}