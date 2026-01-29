from abc import ABC, abstractmethod
from .dtos import UserCreateDto
from .model import User

class IUserRepository(ABC):
    @abstractmethod
    async def get_user(self, email: str) -> User | None:
        pass
    
    @abstractmethod
    async def create(self, dto: UserCreateDto)->User:
        pass