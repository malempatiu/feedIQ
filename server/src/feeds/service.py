from .interfaces import IFeedsRepository
from .dtos import FeedbackCreateDTO, FeedbackResponseDTO, FeedbacksResponseDTO, FeedbackUpdateDTO
from fastapi import HTTPException, status
import math
from src.workflows.categorize_feedback import categorize_feedback


class FeedsService:
    def __init__(self, repo: IFeedsRepository):
        self.feeds_Repo = repo
    
    async def create_feedback(self, user_id: int, dto: FeedbackCreateDTO):
        feedback = await self.feeds_Repo.create(user_id, dto)
        if not feedback:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                detail="Internal server error"
            )

        return feedback
    
    async def get_feedbacks(self, page: int = 0, limit: int = 25):
        feedbacks = await self.feeds_Repo.get_all(offset= page*limit, limit=limit)
        total_count = await self.feeds_Repo.get_total()
        dto = FeedbacksResponseDTO(
            currentPage=page, 
            limit=limit, 
            feedbacks=[FeedbackResponseDTO.model_validate(feedback) for feedback in feedbacks], 
            totalPages=math.ceil(total_count / limit) if limit > 0 else 0,
            totalFeedbacks=total_count
        )
        return dto
    
    async def get_feedback(self, id: int):
        feedback = await self.feeds_Repo.get_by_id(id)
        if not feedback:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Feedback not found!')
        return feedback
    
    async def delete_feedback(self, id: int):
        is_deleted = await self.feeds_Repo.delete(id)
        if not is_deleted:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Feedback not found!')
        return True
    
    async def update_feedback(self, id:int, dto: FeedbackUpdateDTO):
        result = await self.feeds_Repo.update(id, dto)
        return result
    

    async def categorize_feedback(self, id: int, dto: FeedbackCreateDTO):
        if not dto.category:
            category = await categorize_feedback(title=dto.title, detail=dto.detail)
            await self.update_feedback(id, FeedbackUpdateDTO(category=category))

