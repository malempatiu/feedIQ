from .topics import KafkaTopic
from .producer import producer
from pydantic import BaseModel

class FeedbackCreatedDTO(BaseModel):
    id: int
    title: str
    detail: str
    category: str
    event: str | None = 'feedback.created'

class PublishFeedbackCreated:
    @staticmethod
    async def publish(dto: FeedbackCreatedDTO):
        await producer.produce(
            topic=KafkaTopic.FEEDBACKS,
            value=dto.model_dump(),
        )
