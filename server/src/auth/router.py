from fastapi import APIRouter, Depends,status, HTTPException
from .dtos import UserCreateDto, UserResponseDto, UserLoginRequestDto
from .dependencies import get_user_service, TokenBearer
from .service import UserService
from .utils import verify_password, create_token

user_router = APIRouter()
token_bearer = TokenBearer()


@user_router.post('/register', status_code=status.HTTP_201_CREATED, response_model=UserResponseDto)
async def create_user(dto: UserCreateDto, user_service: UserService =Depends(get_user_service)):
    result = await user_service.create_user(dto)
    return result

@user_router.post('/login')
async def login_user(dto: UserLoginRequestDto, user_service: UserService =Depends(get_user_service)):
    user = await user_service.get_user(dto.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User does not exist")
    
    if not verify_password(dto.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Please check password")
    
    token = create_token(user)
    return {'message': 'Login successful!', 'token': token}


@user_router.get('/user/me', status_code=status.HTTP_200_OK, response_model=UserResponseDto)
async def get_user_profile(user_service: UserService = Depends(get_user_service), token_details=Depends(token_bearer)):
    user = await user_service.get_user(token_details['email'])
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="User does not exist")

    return user
