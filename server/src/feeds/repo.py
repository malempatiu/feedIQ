from sqlalchemy.ext.asyncio import AsyncSession
from .interfaces import IFeedsRepository
from .dtos import FeedbackCreateDTO
from .model import Feedback

class FeedsRepository(IFeedsRepository):
    def __init__(self, db_session: AsyncSession):
        self.db = db_session

    async def create(self, dto: FeedbackCreateDTO):
        feedback = Feedback(title=dto.title, detail=dto.detail, priority=dto.priority)
        self.db.add(feedback)
        await self.db.commit()
        await self.db.refresh(feedback)
        return feedback


    async def get_by_id(self, feedback_id: int):
        pass


    async def get_all(self):
     pass

    async def update(self, feedback: Feedback) :
        pass

    async def delete(self, feedback_id: int):
        return False
