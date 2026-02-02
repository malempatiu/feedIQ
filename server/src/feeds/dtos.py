from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from enum import Enum
from src.auth.dtos import UserResponseDto

class PriorityEnum(Enum):
    LOW='Low'
    MEDIUM='Medium'
    HIGH='High'
    BLOCKER='Blocker'

class FeedbackCreateDTO(BaseModel):
    title: str = Field(min_length=10)
    detail: str = Field(min_length=20)
    priority: PriorityEnum | None = None


class FeedbackUpdateDTO(BaseModel):
    title: str | None = Field(default=None, min_length=10)
    detail: str | None = Field(default=None, min_length=20)
    priority: PriorityEnum | None = None


class FeedbackResponseDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    detail: str
    category: str | None = None
    priority: str | None = None
    createdAt: datetime
    updatedAt: datetime | None = None
    user: UserResponseDto | None = None


class FeedbacksResponseDTO(BaseModel):
    currentPage: int
    limit: int
    totalPages: int
    feedbacks: list[FeedbackResponseDTO]


