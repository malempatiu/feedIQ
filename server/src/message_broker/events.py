from typing import Literal
from pydantic import BaseModel

class BaseFeedbackEvent(BaseModel):
    id: int
    title: str
    detail: str
    category: str

class FeedbackCreatedEvent(BaseFeedbackEvent):
    event: Literal["feedback_created"]

class FeedbackUpdatedEvent(BaseFeedbackEvent):
    event: Literal["feedback_updated"]
