class UnsupportedFileTypeError(Exception):
	def __init__(self, file_type: str):
		self.file_type = file_type

		super().__init__(f"Unsupported file type: {file_type}")