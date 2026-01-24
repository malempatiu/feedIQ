from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from enum import Enum

class PriorityEnum(Enum):
    LOW='Low'
    MEDIUM='Medium'
    HIGH='High'
    BLOCKER='Blocker'

class FeedbackCreateDTO(BaseModel):
    title: str = Field(min_length=10)
    detail: str = Field(min_length=20)
    category: str | None
    priority: PriorityEnum | None


class FeedbackResponseDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    detail: str
    category: str | None
    priority: str | None
    createdAt: datetime


