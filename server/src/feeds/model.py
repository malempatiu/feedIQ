from sqlmodel import SQLModel, Field
from .dtos import PriorityEnum
from src.db.mixins import TimestampMixin

class Feedback(TimestampMixin, SQLModel, table=True):
    __tablename__: str = 'feedbacks'
    id: int | None = Field(default=None, primary_key=True)
    title: str
    detail: str
    category: str | None = Field(default=None)
    priority: PriorityEnum | None = Field(default=None)