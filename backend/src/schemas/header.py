from pydantic import BaseModel
from typing import Optional


class HTTPHeader(BaseModel):
    server: Optional[str] = None
    date: Optional[str] = None
    content_type: Optional[str] = None
    content_length: Optional[str] = None
    cache_control: Optional[str] = None
    strict_transport_security: Optional[str] = None
    x_frame_options: Optional[str] = None