import asyncio
from typing import List

from urllib.parse import urlparse
import dns.asyncresolver
import dns.resolver


from ..schemas import DNSRecordType, DNSRecords, MXRecord


async def resolve(
    resolver: dns.asyncresolver.Resolver,
    domain: str,
    record_type: DNSRecordType,
) -> List[str]:
    try:
        answers = await resolver.resolve(domain, record_type.value)
        return [str(answer).rstrip(".") for answer in answers]

    except (
        dns.resolver.NXDOMAIN,
        dns.resolver.NoAnswer,
        dns.resolver.NoNameservers,
        dns.resolver.LifetimeTimeout,
    ):
        return []

async def resolve_mx(
    resolver: dns.asyncresolver.Resolver,
    domain: str,
) -> List[MXRecord]:
    try:
        answers = await resolver.resolve(domain, DNSRecordType.MX.value)
        return [
            MXRecord(
                priority=answer.preference,
                server=str(answer.exchange),
            )
            for answer in answers
        ]

    except (
        dns.resolver.NXDOMAIN,
        dns.resolver.NoAnswer,
        dns.resolver.NoNameservers,
        dns.resolver.LifetimeTimeout,
    ):
        return []

async def get_dns_information(domain: str) -> DNSRecords:
    if "://" in domain:
        _domain = urlparse(domain)
        domain = _domain.hostname or domain

    resolver = dns.asyncresolver.Resolver()

    a, aaaa, mx, cname, ns, txt = await asyncio.gather(
        resolve(resolver, domain, DNSRecordType.A),
        resolve(resolver, domain, DNSRecordType.AAAA),
        resolve_mx(resolver, domain),
        resolve(resolver, domain, DNSRecordType.CNAME),
        resolve(resolver, domain, DNSRecordType.NS),
        resolve(resolver, domain, DNSRecordType.TXT),
    )

    return DNSRecords(
        A=a,
        AAAA=aaaa,
        MX=mx,
        CNAME=cname,
        NS=ns,
        TXT=txt,
    )