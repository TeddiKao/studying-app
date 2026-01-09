import os
import requests

from typing import Any, Dict, Optional, Annotated

from jose import jwt
from fastapi import Header, HTTPException, status
from dotenv import load_dotenv

load_dotenv()

jwks_endpoint = os.environ.get("CLERK_JWKS_ENDPOINT")
jwt_issuer_domain = os.environ.get("CLERK_JWT_ISSUER_DOMAIN")
jwks_cache: Optional[Dict[str, Any]] = None

AuthorizationHeader = Annotated[str | None, Header(alias="Authorization")]

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
	print("Calling function")
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

def verify_jwt_token_in_header(authorization_header: AuthorizationHeader = None) -> Dict[str, Any] | None:
	print("Verifying token in header")
	
	if authorization_header is None:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Missing Authorization header",
		)

	if not authorization_header.startswith("Bearer "):
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Invalid Authorization header format",
		)

	token = authorization_header.split(" ", 1)[1].strip()

	if not token:
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Invalid Authorization header format",
		)

	try:
		payload = verify_jwt_token(token)
	except Exception as exc:
		print(exc)
		raise HTTPException(
			status_code=status.HTTP_401_UNAUTHORIZED,
			detail="Invalid or expired token",
		) from exc

	return payload