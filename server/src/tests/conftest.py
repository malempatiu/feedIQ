import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from typing import AsyncGenerator

from src.feeds.interfaces import IFeedsRepository
from src.feeds.model import Feedback
from datetime import datetime
from src.feeds.dtos import FeedbackCreateDTO
from src.main import app
from src.feeds.dependencies import get_feeds_repository

class MockFeedsRepository(IFeedsRepository):
    """In-memory repository - simulates database without needing one"""

    def __init__(self):
        self.feedbacks: dict[int, Feedback] = {}
        self.next_id = 1
    
    async def create(self, dto: FeedbackCreateDTO) -> Feedback:
        feedback = Feedback(
            id=self.next_id,
            title=dto.title, 
            detail=dto.detail, 
            category=dto.category, 
            priority=dto.priority, 
            createdAt=datetime.now()
        )
        self.feedbacks[self.next_id] = feedback
        self.next_id += 1
        return feedback

    async def get_by_id(self, feedback_id: int):
        pass

    async def get_all(self):
     pass

    async def update(self, feedback: Feedback):
        pass

    async def delete(self, feedback_id: int):
        return False


@pytest.fixture
def mock_repo() -> MockFeedsRepository:
    """Fresh mock repository for each test"""
    return MockFeedsRepository()


@pytest_asyncio.fixture()
async def client(mock_repo: MockFeedsRepository) -> AsyncGenerator[AsyncClient, None]:
    """
    AsyncClient makes REAL HTTP calls to your FastAPI app
    Only the repository is mocked - everything else is real
    """

    # Override ONLY the repository dependency
    def override_get_feeds_repository() -> IFeedsRepository:
        return mock_repo

    app.dependency_overrides[get_feeds_repository] = override_get_feeds_repository

    # Create AsyncClient - this makes REAL HTTP requests
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as ac:
        yield ac

    # Cleanup
    app.dependency_overrides.clear()
