from sqlalchemy.ext.asyncio import AsyncSession
from .interfaces import IFeedsRepository
from .dtos import FeedbackCreateDTO
from .model import Feedback
from sqlmodel import select, func

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


    async def get_all(self, offset:int, limit: int):
        statement = select(Feedback).offset(offset).limit(limit)
        results = await self.db.execute(statement)
        return results.scalars().all()
    
    async def get_total(self) -> int:
        statement = select(func.count()).select_from(Feedback)
        result = await self.db.execute(statement)
        return result.scalar_one()

    async def update(self, feedback: Feedback) :
        pass

    async def delete(self, feedback_id: int):
        return False
