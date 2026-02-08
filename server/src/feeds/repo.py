from sqlalchemy.ext.asyncio import AsyncSession
from .interfaces import IFeedsRepository
from .dtos import FeedbackCreateDTO, FeedbackUpdateDTO
from .model import Feedback
from sqlmodel import select, func
from sqlalchemy.orm import joinedload
from fastapi import HTTPException, status

class FeedsRepository(IFeedsRepository):
    def __init__(self, db_session: AsyncSession):
        self.db = db_session

    async def create(self, user_id: int, dto: FeedbackCreateDTO):
        feedback = Feedback(
            title=dto.title, 
            detail=dto.detail, 
            priority=dto.priority, 
            userId=user_id,
            category=dto.category
        )
        self.db.add(feedback)
        await self.db.commit()
        await self.db.refresh(feedback)
        return feedback


    async def get_by_id(self, id: int):
        statement = select(Feedback).where(Feedback.id==id)
        result = await self.db.execute(statement)
        row = result.first()
        if row:
            feedback = row.tuple()[0]
            return feedback
        return None


    async def get_all(self, offset:int, limit: int):
        statement = select(Feedback).options(
            joinedload(Feedback.user)  # type: ignore[arg-type]
        ).offset(offset).limit(limit)
        result = await self.db.execute(statement)
        feedbacks = result.scalars().all()
        return feedbacks
    
    async def get_total(self) -> int:
        statement = select(func.count()).select_from(Feedback)
        result = await self.db.execute(statement)
        return result.scalar_one()

    async def delete(self, id: int):
        feedback = await self.get_by_id(id)
        if not feedback:
            return False
        await self.db.delete(feedback)
        await self.db.commit()
        return True
    
    async def update(self, id: int, dto: FeedbackUpdateDTO) :
        feedback = await self.get_by_id(id)

        if not feedback:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Feedback not found!')
        
        if dto.title is not None:
            feedback.title = dto.title
        if dto.detail is not None:
            feedback.detail = dto.detail
        if dto.priority is not None:
            feedback.priority = dto.priority
        if dto.category is not None:
            feedback.category = dto.category
                
        await self.db.commit()
        return feedback
