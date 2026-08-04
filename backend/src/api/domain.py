from fastapi import APIRouter

from ..schemas import Domain
from ..services import get_domain_information

router = APIRouter(
    prefix="/domain",
    tags=["Domains"]
)

@router.get("/", response_model=Domain)
async def domain_information(url: str) -> Domain:
    result = await get_domain_information(url)
    return result