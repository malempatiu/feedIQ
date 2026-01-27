from .interfaces import IUserRepository
from .dtos import UserCreateDto
from fastapi import HTTPException, status
from .utils import get_password_hash

class UserService:
    def __init__(self, repo: IUserRepository):
        self.user_repo=repo

    
    async def create_user(self, dto: UserCreateDto):
        user = await self.user_repo.get_user(dto.email)
        if user:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='User with email already exists!')
        
        hash_password = get_password_hash(dto.password)
        dto.password=hash_password
        user = await self.user_repo.create(dto)
        return user