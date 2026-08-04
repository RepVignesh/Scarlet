from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class Domain(BaseModel):
    domain_name: str
    registrar: str
    registrar_url: Optional[str] = None
    registrar_iana: Optional[str] = None
    creation_date: Optional[datetime] = None
    updated_date: Optional[datetime] = None
    expiration_date: Optional[datetime] = None
    name_servers: List[str] = []
    organization: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    status: List[str] | str
    emails: List[str] | str
    dnssec: Optional[str] = None