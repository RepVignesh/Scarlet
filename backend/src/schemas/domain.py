from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class Domain(BaseModel):
    domain_name: str
    registrar: str = "Unknown"
    registrar_url: Optional[str] = None
    registrar_iana: Optional[str] = None
    creation_date: Optional[datetime] = None
    updated_date: Optional[datetime] = None
    expiration_date: Optional[datetime] = None
    name_servers: List[str] = Field(default_factory=list)
    organization: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    status: List[str] | str = Field(default_factory=list)
    emails: List[str] | str = Field(default_factory=list)
    dnssec: Optional[str] = None
