from typing import TypedDict, NotRequired

class Block(TypedDict):
	type: str
	level: NotRequired[int]
	text: str