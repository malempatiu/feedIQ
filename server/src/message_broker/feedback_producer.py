from .topics import KafkaTopic
from .kafka.producer import kafka_producer
from .events import FeedbackCreatedEvent, FeedbackUpdatedEvent
from .interfaces import IFeedbackTopicProducer


class FeedbackTopicProducer(IFeedbackTopicProducer):
    def __init__(self):
        self.producer = kafka_producer
        self.topic = KafkaTopic.FEEDBACKS

    async def send_created(self, message: FeedbackCreatedEvent):
        await self.producer.send(self.topic, message)

    async def send_updated(self, message: FeedbackUpdatedEvent):
        await self.producer.send(self.topic, message)
