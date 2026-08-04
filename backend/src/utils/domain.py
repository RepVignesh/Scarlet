from urllib.parse import urlparse

def extract_domain(domain: str) -> str:
    if "://" in domain:
        domain = urlparse(domain).hostname or domain

    return domain.lower()