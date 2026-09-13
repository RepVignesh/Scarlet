import httpx

from ..schemas.header import HTTPHeader


async def get_headers(url: str) -> HTTPHeader:
    timeout = httpx.Timeout(10.0, connect=5.0)
    async with httpx.AsyncClient(timeout=timeout, follow_redirects=True) as client:
        response = await client.get(
            url,
            headers={"User-Agent": "Scarlet/1.0"},
        )

    return HTTPHeader(
        server=response.headers.get("Server"),
        date=response.headers.get("Date"),
        content_type=response.headers.get("Content-Type"),
        content_length=response.headers.get("Content-Length"),
        cache_control=response.headers.get("Cache-Control"),
        strict_transport_security=response.headers.get("Strict-Transport-Security"),
        x_frame_options=response.headers.get("X-Frame-Options"),
    )
