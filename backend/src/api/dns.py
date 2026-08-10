from fastapi import APIRouter

from ..schemas import DNSRecords
from ..services import get_dns_information

router = APIRouter(
    prefix="/dns",
    tags=["Domains"]
)

@router.get("/", response_model=DNSRecords)
async def dns_information(url: str) -> DNSRecords:
    result = await get_dns_information(url)
    return result