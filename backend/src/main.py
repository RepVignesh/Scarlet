from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.domain import router as domain_router
from .api.dns import router as dns_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router=domain_router)
app.include_router(router=dns_router)