from .repo import UserRepository
from .interfaces import IUserRepository
from .service import UserService
from src.db.session import get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends

def get_user_repo(session: AsyncSession = Depends(get_async_session)):
    return UserRepository(session)

def get_user_service(repo: IUserRepository=Depends(get_user_repo)):
    return UserService(repo)