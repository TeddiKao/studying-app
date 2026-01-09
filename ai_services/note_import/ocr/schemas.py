from pydantic import BaseModel
from typing import Optional

class Block(BaseModel):
	type: str
	level: Optional[int] = None
	text: str