from .repo import UserRepository
from .interfaces import IUserRepository
from .service import UserService
from src.db.session import get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, Request, HTTPException, status
from fastapi.security import HTTPBearer
from fastapi.security.http import HTTPAuthorizationCredentials
from .utils import decode_token

def get_user_repo(session: AsyncSession = Depends(get_async_session)):
    return UserRepository(session)

def get_user_service(repo: IUserRepository=Depends(get_user_repo)):
    return UserService(repo)


class TokenBearer(HTTPBearer):
    def __init__(self, auto_error=True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request) -> HTTPAuthorizationCredentials | dict:
        http_creds = await super().__call__(request)

        if not http_creds:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Not authorized')

        token = http_creds.credentials

        token_data = decode_token(token)
        print(f'***************************************{token_data}')
        if not token_data:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail='Not authorized')
        return token_data


