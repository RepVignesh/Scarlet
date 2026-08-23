from ..schemas import Domain
from whois import whois

import asyncio


async def get_domain_information(domain: str) -> Domain:
    result = await asyncio.to_thread(whois, domain)

    for field in (
        "creation_date",
        "updated_date",
        "expiration_date",
    ):
        value = result.get(field)

        if isinstance(value, list):
            result[field] = value[0] if value else None

    return Domain.model_validate(result)