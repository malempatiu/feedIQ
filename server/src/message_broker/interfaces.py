from abc import ABC, abstractmethod
from .events import FeedbackUpdatedEvent, FeedbackCreatedEvent

class IFeedbackTopicProducer(ABC):
    @abstractmethod
    async def send_created(self, message: FeedbackCreatedEvent):
        """Publish Feedback Create Message"""

    @abstractmethod
    async def send_updated(self, message: FeedbackUpdatedEvent):
        """Publish Feedback Updated Message"""
