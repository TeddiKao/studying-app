from fastapi import File, UploadFile
from transformers import TrOCRProcessor, VisionEncoderDecoderModel
from PIL import Image
from io import BytesIO

import os
print("CWD:", os.getcwd())

processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten")
model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")

async def get_text_from_image(image_file: UploadFile = File(...)):
	image_contents = await image_file.read()
	image = Image.open(BytesIO(image_contents)).convert("RGB")

	pixel_values = processor(images=image, return_tensors="pt").pixel_values
	generated_ids = model.generate(pixel_values)

	text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
	
	return text
