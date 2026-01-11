from ai_services.note_import.ocr.schemas import Block
from typing import List

def parse_blocks_from_text(text: str) -> List[Block]:
	return [{
		"type": "paragraph",
		"text": text.strip()
	}]