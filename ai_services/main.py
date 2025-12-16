from fastapi import FastAPI

from .routers import note_upload_service
from .middleware import add_cors_middleware

app = FastAPI(root_path="/api")

add_cors_middleware(app)

app.include_router(note_upload_service.router)
