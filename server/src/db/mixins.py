from datetime import datetime
from sqlmodel import Field, SQLModel


class TimestampMixin(SQLModel):
    """A mixin to add created_at and updated_at timestamp fields to a model."""

    createdAt: datetime = Field(
        default_factory=datetime.now,
        nullable=False
    )
    updatedAt: datetime = Field(
        default_factory=None,
        nullable=True,
        sa_column_kwargs={"onupdate": datetime.now}
    )
