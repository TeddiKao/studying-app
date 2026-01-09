import magic

from fastapi import UploadFile

async def detect_file_type(file: UploadFile) -> str:
	header = await file.read(2048)
	await file.seek(0)

	detected_mime_type = magic.from_buffer(header, mime=True)
	
	return detected_mime_type