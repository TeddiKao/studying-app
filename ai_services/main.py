from fastapi import FastAPI, Depends

from .routers import note_upload_service
from .middleware import add_cors_middleware
from .dependencies import verify_jwt_token_in_header

app = FastAPI(root_path="/api", dependencies=[Depends(verify_jwt_token_in_header)])

add_cors_middleware(app)

app.include_router(note_upload_service.router)
