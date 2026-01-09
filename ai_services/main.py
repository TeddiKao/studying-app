from fastapi import FastAPI, Depends

from ai_services.note_import.dispatcher.router import router as note_import_router
from ai_services.middleware import add_cors_middleware
from ai_services.dependencies import verify_jwt_token_in_header

app = FastAPI(root_path="/api", dependencies=[Depends(verify_jwt_token_in_header)])

add_cors_middleware(app)

app.include_router(note_import_router)
