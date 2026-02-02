from sqlmodel import SQLModel, Field, Relationship
from .dtos import PriorityEnum
from src.db.mixins import TimestampMixin
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from src.auth.model import User


class Feedback(TimestampMixin, SQLModel, table=True):
    __tablename__: str = 'feedbacks'
    id: int | None = Field(default=None, primary_key=True)
    title: str
    detail: str
    category: str | None = Field(default=None)
    priority: PriorityEnum | None = Field(default=None)
    userId: int | None = Field(default=None, foreign_key="users.id")
    user: "User" = Relationship(back_populates="feedbacks")
