from fastapi import APIRouter, HTTPException

from ..schemas import Domain, HTTPHeader
from ..services import get_domain_information, get_headers

router = APIRouter(prefix="/domain", tags=["Domains"])


@router.get("/", response_model=Domain)
async def domain_information(url: str) -> Domain:
    try:
        return await get_domain_information(url)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"WHOIS lookup failed: {exc}") from exc


@router.get("/headers", response_model=HTTPHeader)
async def fetch_headers(url: str) -> HTTPHeader:
    try:
        return await get_headers(url)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"HTTP request failed: {exc}") from exc
