from fastapi import FastAPI

from .api.domain import router as domain_router
from .api.dns import router as dns_router

app = FastAPI()

app.include_router(router=domain_router)
app.include_router(router=dns_router)