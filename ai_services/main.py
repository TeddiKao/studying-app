from fastapi import FastAPI

from .routers import note_upload_service

app = FastAPI(root_path="/api")

app.include_router(note_upload_service.router)
