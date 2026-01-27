from fastapi import APIRouter, Depends,status
from .dtos import UserCreateDto, UserResponseDto
from .dependencies import get_user_service
from .service import UserService

user_router = APIRouter()

@user_router.post('/register', status_code=status.HTTP_201_CREATED, response_model=UserResponseDto)
async def create_user(dto: UserCreateDto, user_service: UserService =Depends(get_user_service)):
    result = await user_service.create_user(dto)
    return result