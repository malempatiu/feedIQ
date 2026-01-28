from pwdlib import PasswordHash
import jwt
from datetime import datetime, timedelta, timezone
from .model import User
from src.config import get_settings
import logging


settings = get_settings()
password_hash = PasswordHash.recommended()


def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)


def get_password_hash(password):
    return password_hash.hash(password)


def create_token(user: User, expires_delta: timedelta | None = None):
    to_encode = {
        'id': user.id,
        'email': user.email,
        'fullName': user.first_name + ' ' +user.last_name
    }
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=7)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


def decode_token(token: str) -> dict | None:
    try:
        print(f'token: {token}')
        token_data = jwt.decode(
            jwt=token, key=settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM]
        )

        return token_data
    except jwt.ExpiredSignatureError:
        logging.error("Token has expired")
        return None
    except jwt.InvalidSignatureError:
        logging.error("Invalid token signature")
        return None
    except jwt.DecodeError as e:
        logging.error(f"Token decode error: {e}")
        return None
    except jwt.InvalidTokenError as e:
        logging.error(f"Invalid token: {e}")
        return None
