from ..schemas import Domain
from whois import whois

import asyncio


async def get_domain_information(domain: str) -> Domain:
    result = await asyncio.to_thread(
        whois,
        domain
    )
    return Domain.model_validate(result)