import requests

from ..schemas.header import HTTPHeader


def get_headers(url: str) -> HTTPHeader:

    response = requests.get(url, timeout=10)

    return HTTPHeader(
        server=response.headers.get("Server"),
        date=response.headers.get("Date"),
        content_type=response.headers.get("Content-Type"),
        content_length=response.headers.get("Content-Length"),
        cache_control=response.headers.get("Cache-Control"),
        strict_transport_security=response.headers.get(
            "Strict-Transport-Security"
        ),
        x_frame_options=response.headers.get("X-Frame-Options")
    )