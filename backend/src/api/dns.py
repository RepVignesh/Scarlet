from fastapi import APIRouter, HTTPException

from ..schemas import DNSRecords
from ..services import get_dns_information

router = APIRouter(prefix="/dns", tags=["DNS"])


@router.get("", response_model=DNSRecords)
async def dns_information(url: str) -> DNSRecords:
    try:
        return await get_dns_information(url)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"DNS lookup failed: {exc}") from exc
