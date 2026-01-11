from ai_services.note_import.ocr.schemas import Block

def parse_blocks_from_text(text: str) -> list[Block]:
	return [{
		"type": "paragraph",
		"text": text.strip()
	}]