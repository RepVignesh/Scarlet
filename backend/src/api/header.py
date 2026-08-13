from fastapi import APIRouter

from ..schemas import HTTPHeader
from ..services import get_headers

router = APIRouter()


@router.get("/headers", response_model=HTTPHeader)
def fetch_headers(url: str):

    return get_headers(url)