from sqlmodel import SQLModel, Field, Relationship
from src.db.mixins import TimestampMixin
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from src.feeds.model import Feedback

class User(TimestampMixin, SQLModel, table=True):
    __tablename__:str='users'
    id: int | None = Field(default=None, primary_key=True)
    first_name: str
    last_name: str
    email: str
    password: str = Field(exclude=True, nullable=False)
    is_verified: bool = Field(default=False, nullable=False)
    role: str = Field(default="user", nullable=False)
    feedbacks: list["Feedback"] | None = Relationship(back_populates='user')
