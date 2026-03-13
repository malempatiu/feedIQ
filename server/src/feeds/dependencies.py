from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from .repo import FeedsRepository
from .service import FeedsService
from src.db.session import get_async_session
from .interfaces import IFeedsRepository
from src.message_broker.feedback_producer import FeedbackTopicProducer


def get_feeds_repository(session: AsyncSession = Depends(get_async_session)) -> IFeedsRepository:
    """Returns concrete implementation of IFeedbackRepository"""
    return FeedsRepository(session)


def get_feeds_service(repo: FeedsRepository = Depends(get_feeds_repository)) -> FeedsService:
    """Returns FeedbackService with injected repositories"""
    return FeedsService(repo, feedbackTopicProducer=FeedbackTopicProducer())