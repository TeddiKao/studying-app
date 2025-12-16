from fastapi import FastAPI, Request, Header, APIRouter

router = APIRouter()

@router.post("/upload_note")
async def upload_note(authorization: str = Header(None)):
	return {
		"success": True,
		"token": authorization
	}