from pydantic import BaseModel, EmailStr, Field

class UserCreateDto(BaseModel):
    firstName: str = Field(max_length=10)
    lastName: str = Field(max_length=10)
    email: EmailStr = Field(max_length=25)
    password: str = Field(min_length=8,  max_length=13)


class UserLoginRequestDto(BaseModel):
    email: str
    password: str


class UserResponseDto(BaseModel):
    id: int
    firstName: str = Field(alias='first_name')
    lastName: str = Field(alias='last_name')
    email: str
    password: str = Field(exclude=True)
    isVerified: bool = Field(alias='is_verified', exclude=True)
    role: str