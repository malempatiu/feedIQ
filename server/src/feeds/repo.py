from sqlalchemy.ext.asyncio import AsyncSession
from .interfaces import IFeedsRepository
from .dtos import FeedbackCreateDTO
from .model import Feedback

class FeedsRepository(IFeedsRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, feedback: FeedbackCreateDTO):
        pass

    async def get_by_id(self, feedback_id: int):
        pass


    async def get_all(self):
     pass

    async def update(self, feedback: Feedback) :
        pass

    async def delete(self, feedback_id: int):
        return False
