from fastapi import FastAPI

from .api.domain import router as domain_router

app = FastAPI()

app.include_router(router=domain_router)