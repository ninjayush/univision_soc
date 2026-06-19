# Week 4 Homework: API JSON Contracts

This document defines the strict data agreements between the React frontend (Dashboard) and the FastAPI backend (AI Pipeline).

## 1. Valid Request (Dashboard -> Backend)
**Endpoint:** `POST /api/v1/analyze-frame`
**Headers:** `Content-Type: application/json`

This payload is sent by the dashboard when a new frame is captured from a source.

```json
{
  "camera_id": "Cam_02_Loading_Dock",
  "timestamp": "2026-06-19T08:15:30Z",
  "image_url": "https://storage.local/streams/cam02/frame_9942.jpg"
}
```

## 2. Successful Response (Backend -> Dashboard)       
**Status Code:** 200 OK  

The backend returns this after successfully running the image through the pipeline blocks.   

```json
{
  "status": "success",  
  "processing_time_ms": 124,  
  "detections": [    
    {   
      "object_class": "person",
      "confidence": 0.92,
      "is_anomaly": false
    },
    {
      "object_class": "unauthorized_vehicle",
      "confidence": 0.88,
      "is_anomaly": true
    }
  ]
}
```

## 3. Validation Error Response (Backend -> Dashboard)
**Status Code:** 422 Unprocessable Entity

If the frontend sends an invalid or incomplete payload (e.g., missing the `camera_id`), the Pydantic validator automatically intercepts the request and returns this error schema before hitting the core pipeline logic.

```json
{
  "detail": [
    {
      "loc": ["body", "camera_id"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```