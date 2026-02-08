from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from enum import Enum

class PriorityEnum(Enum):
    LOW='Low'
    MEDIUM='Medium'
    HIGH='High'
    BLOCKER='Blocker'

class SentimentEnum(Enum):
    POSITIVE='Positive'
    NEGATIVE='Negative'
    NEUTRAL='Neutral'

class FeedbackCreateDTO(BaseModel):
    title: str = Field(min_length=10)
    detail: str = Field(min_length=20)
    priority: PriorityEnum | None = None
    category: str | None = None


class FeedbackUpdateDTO(BaseModel):
    title: str | None = Field(default=None, min_length=10)
    detail: str | None = Field(default=None, min_length=20)
    priority: PriorityEnum | None = None
    category: str | None = None


class FeedbackResponseDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    detail: str
    category: str | None = None
    priority: str | None = None
    votes: int | None = 0
    sentiment: str | None = None
    createdAt: datetime
    updatedAt: datetime | None = None


class FeedbacksResponseDTO(BaseModel):
    currentPage: int
    limit: int
    totalPages: int
    feedbacks: list[FeedbackResponseDTO]


