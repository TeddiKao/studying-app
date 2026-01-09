from fastapi import FastAPI, Depends

from ai_services.routers import note_upload_service
from ai_services.middleware import add_cors_middleware
from ai_services.dependencies import verify_jwt_token_in_header

app = FastAPI(root_path="/api", dependencies=[Depends(verify_jwt_token_in_header)])

add_cors_middleware(app)

app.include_router(note_upload_service.router)
