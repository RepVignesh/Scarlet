import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.domain import router as domain_router
from .api.dns import router as dns_router

app = FastAPI(
    title="Scarlet API",
    description="Automatic domain, DNS, and HTTP header footprinting API.",
)

frontend_origins = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(domain_router)
app.include_router(dns_router)

@app.get("/health", tags=["Health"])
async def health():
    return {"status": "ok"}
