# KrishiAI FastAPI - AI Service Entry Point
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import disease, yield_pred

app = FastAPI(
    title="KrishiAI - AI Service",
    description="AI endpoints for disease detection, yield prediction, and soil recommendation",
    version="1.0.0"
)

# Allow requests from Node backend and React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(disease.router, tags=["Disease Detection"])
app.include_router(yield_pred.router, tags=["Yield Prediction"])

@app.get("/")
def root():
    return {"message": "KrishiAI AI Service running ✅", "docs": "/docs"}

@app.get("/health")
def health():
    return {"status": "ok", "service": "KrishiAI AI API"}
