from contextlib import asynccontextmanager
from typing import AsyncGenerator, Tuple
from sqlalchemy.ext.asyncio import AsyncSession

from .repo import FeedsRepository
from .service import FeedsService
from src.db.session import async_session


@asynccontextmanager
async def get_feeds_service() -> AsyncGenerator[Tuple[FeedsService, AsyncSession], None]:
    """Context manager for FeedsService"""
    async with async_session() as session:
        feeds_repo = FeedsRepository(session)
        feeds_service = FeedsService(feeds_repo)
        yield feeds_service, session
