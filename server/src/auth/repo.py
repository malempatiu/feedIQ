from src.auth.dtos import UserLoginRequestDto
from .interfaces import IUserRepository
from sqlalchemy.ext.asyncio import AsyncSession
from .dtos import UserCreateDto
from sqlmodel import select
from .model import User


class UserRepository(IUserRepository):
    def __init__(self, session: AsyncSession):
        self.db = session
    
    async def create(self, dto: UserCreateDto):
        user = User(first_name=dto.firstName, last_name=dto.lastName, password=dto.password, email=dto.email)
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def get_user(self, email: str):
        statement = select(User).where(User.email==email)
        result = await self.db.execute(statement)
        row = result.first()
        if row:
            user = row.tuple()[0]
            return user
        return None
    

    async def update_password(self, dto: UserLoginRequestDto) -> bool:
        user = await self.get_user(email=dto.email)
        if user:
            user.password = dto.password
            self.db.add(user)
            await self.db.commit()
            return True
        
        return False
