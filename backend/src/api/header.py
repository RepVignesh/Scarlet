from fastapi import APIRouter

from ..schemas import HTTPHeader
from ..services import get_headers

router = APIRouter()


@router.get("/headers", response_model=HTTPHeader)
async def fetch_headers(url: str):

    return await get_headers(url)