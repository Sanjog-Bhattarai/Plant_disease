from fastapi import FastAPI, File, UploadFile, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from keras.models import load_model
import cloudinary
import cloudinary.uploader
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId

app = FastAPI()

# CORS settings
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["potato_disease"]
collection = db["disease_results"]

# Load model
MODEL = load_model("../saved_models/1")
CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"]

# Cloudinary setup
cloudinary.config(
    cloud_name='dtjvsj2za',
    api_key='813632337947737',
    api_secret='y531kDsmV6schSy-NS1RSP4jasY'
)

@app.get("/ping")
async def ping():
    return {"message": "Hello, I am alive"}

def read_file_as_image(data) -> np.ndarray:
    try:
        image = Image.open(BytesIO(data))
        return np.array(image)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid image file")

@app.get("/history")
async def get_history():
    try:
        # Retrieve all documents from the collection
        results = collection.find().sort([("date", -1), ("time", -1)])  # Sort by date and time, latest first
        
        # Convert MongoDB documents to a list of dictionaries
        history_data = []
        for result in results:
            history_data.append({
                "id": str(result["_id"]),
                "imageUrl": result["image_url"],
                "disease": result["disease_class"],
                "solution": result["accuracy"],  # Assuming you want to show the accuracy as a solution for now
                "date": result["date"],
                "time": result["time"]
            })
        
        return history_data
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Read and process the image
        image_data = await file.read()
        image = read_file_as_image(image_data)
        img_batch = np.expand_dims(image, 0)

        # Predict class
        predictions = MODEL.predict(img_batch)
        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])
        accuracy = int(confidence * 100)

        # Upload image to Cloudinary
        result = cloudinary.uploader.upload(BytesIO(image_data), folder='potato_disease_images')
        image_url = result['secure_url']

        # Save result to MongoDB
        result_data = {
            'image_url': image_url,
            'accuracy': accuracy,
            'disease_class': predicted_class,
            'date': datetime.utcnow().strftime("%Y-%m-%d"),
            'time': datetime.utcnow().strftime("%H:%M:%S")
        }
        collection.insert_one(result_data)

        return {
            'class': predicted_class,
            'confidence': float(confidence),
            'Accuracy': accuracy
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/history/{item_id}")
async def delete_history(item_id: str):
    try:
        # Convert item_id to ObjectId
        result = collection.delete_one({"_id": ObjectId(item_id)})

        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Record not found")

        return {"message": "Record deleted successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
