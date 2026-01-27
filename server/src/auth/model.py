from sqlmodel import SQLModel, Field
from src.db.mixins import TimestampMixin

class User(TimestampMixin, SQLModel, table=True):
    __tablename__:str='users'
    id: int | None = Field(default=None, primary_key=True)
    email: str
    first_name: str
    last_name: str
    role: str = Field(default="user", nullable=False)
    is_verified: bool = Field(default=False, nullable=False)
    password: str = Field(exclude=True, nullable=False)
