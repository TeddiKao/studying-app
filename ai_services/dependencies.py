import os
from typing import Any, Dict, Optional

import requests
from jose import jwt

jwks_endpoint = os.environ.get("CLERK_JWKS_ENDPOINT")
jwt_issuer_domain = os.environ.get("CLERK_JWT_ISSUER_DOMAIN")

jwks_cache: Optional[Dict[str, Any]] = None


def get_jwks() -> Dict[str, Any]:
    global jwks_cache

    if jwks_cache is None:
        if not jwks_endpoint:
            raise RuntimeError("CLERK_JWKS_ENDPOINT environment variable is not set")

        response = requests.get(jwks_endpoint)
        response.raise_for_status()
        jwks_cache = response.json()

    return jwks_cache


def get_signing_key(token: str) -> Dict[str, Any]:
    headers = jwt.get_unverified_header(token)
    kid = headers.get("kid")

    if not kid:
        raise ValueError("JWT header missing 'kid'")

    jwks = get_jwks()
    keys = jwks.get("keys", [])

    for key in keys:
        if key.get("kid") == kid:
            return key

    raise ValueError("No matching JWK found for token 'kid'")


def verify_jwt_token(token: str) -> Dict[str, Any]:
    """
    Verify a JWT against the configured JWKS endpoint.

    - Validates the signature using the JWK matching the token's 'kid'
    - Enforces 'exp' and 'aud' checks, where aud must be 'backend'

    Any validation errors raised by `python-jose` or this function are
    expected to be handled by the caller.
    """

    signing_key = get_signing_key(token)
    algorithm = signing_key.get("alg", "RS256")

    payload = jwt.decode(
        token,
        signing_key,
        algorithms=[algorithm],
        audience="backend",
        options={
            "verify_signature": True,
            "verify_exp": True,
            "verify_aud": True,
        },
    )

    return payload