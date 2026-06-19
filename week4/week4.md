# Week 4: API JSON Contracts & Data Validation

This week connects the React dashboard and backend AI pipeline via a type-safe API contract.

## Summary of Work
*   **Lab:** Built a FastAPI service in [lab.py](file:///c:/Users/multi/univision_soc/week4/lab.py) with Pydantic validation schemas.
*   **Homework:** Defined example JSON request, response, and error payloads in [hw.md](file:///c:/Users/multi/univision_soc/week4/hw.md).

## Core Theory
*   **API Contract:** A formal agreement between client and server defining endpoints, methods, headers, and exact payload shapes.
*   **Data Validation:** Parsing raw input into typed objects. FastAPI utilizes Pydantic to enforce constraints and auto-generate OpenAPI documentation.
*   **Lab:** Implemented a lightweight Python microservice in [lab.py](file:///c:/Users/multi/univision_soc/week4/lab.py) using **FastAPI** and **Pydantic** to declare and enforce request/response schemas.
### HTTP Status Codes:
*   **Homework:** Defined and documented the strict JSON payloads in [hw.md](file:///c:/Users/multi/univision_soc/week4/hw.md), covering successful execution pathways as well as automatic validation errors.
*   `200 OK`: Successful processing and return of detection results.
*   `400 Bad Request`: Correct JSON syntax but failed business logic (e.g. empty string `camera_id`).
*   `422 Unprocessable Entity`: Invalid JSON shape (e.g. missing required fields) caught by Pydantic validator.
---
## Running & Testing
1. Install dependencies:
   ```bash
   pip install fastapi uvicorn pydantic
   ```
2. Start the API server:
   ```bash
   python -m uvicorn week4.lab:app --reload
   ```
3. Test requests interactively using Swagger UI:
   **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**