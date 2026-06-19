from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Uni_Vision Pipeline API")

# 1. Define the Request Contract (What the Dashboard sends)
class FrameRequest(BaseModel):
    camera_id: str
    timestamp: str
    image_url: str  # In a real app, this might be a base64 string

# 2. Define the Response Contract (What the AI returns)
class Detection(BaseModel):
    object_class: str
    confidence: float
    is_anomaly: bool

class FrameResponse(BaseModel):
    status: str
    processing_time_ms: int
    detections: List[Detection]

# 3. The API Endpoint (The Route)
@app.post("/api/v1/analyze-frame", response_model=FrameResponse)
async def analyze_frame(payload: FrameRequest):
    # Validation: If the camera ID is missing, throw a 400 Bad Request error
    if not payload.camera_id:
        raise HTTPException(status_code=400, detail="camera_id is required")

    # (This is where your Week 2 Python logic would run)
    
    # Mocking a successful response
    return {
        "status": "success",
        "processing_time_ms": 124,
        "detections": [
            {"object_class": "person", "confidence": 0.92, "is_anomaly": False},
            {"object_class": "unauthorized_vehicle", "confidence": 0.88, "is_anomaly": True}
        ]
    }

    