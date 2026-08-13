from fastapi import APIRouter

from ..schemas import Domain, HTTPHeader
from ..services import get_domain_information, get_headers

router = APIRouter(
    prefix="/domain",
    tags=["Domains"]
)

@router.get("/", response_model=Domain)
async def domain_information(url: str) -> Domain:
    result = await get_domain_information(url)
    return result


@router.get("/headers", response_model=HTTPHeader)
async def fetch_headers(url: str):
    return await get_headers(url)