from enum import Enum
from typing import List
from pydantic import BaseModel, Field


class DNSRecordType(str, Enum):
    A = "A" # Domain to ipv4 address
    AAAA = "AAAA" # Domain to ipv6 address
    MX = "MX" # Mail Servers
    CNAME = "CNAME" # Domain alias
    NS = "NS" # Authorative DNS server
    TXT = "TXT" # Arbitrary DNS text


class MXRecord(BaseModel):
    priority: int
    server: str


class DNSRecords(BaseModel):
    A: List[str] = Field(default_factory=list)
    AAAA: List[str] = Field(default_factory=list)
    MX: List[MXRecord] = Field(default_factory=list)
    CNAME: List[str] = Field(default_factory=list)
    NS: List[str] = Field(default_factory=list)
    TXT: List[str] = Field(default_factory=list)