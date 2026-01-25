from .interfaces import IFeedsRepository
from .dtos import FeedbackCreateDTO, FeedbackResponseDTO, FeedbacksResponseDTO
from fastapi import HTTPException, status
import math


class FeedsService:
    def __init__(self, repo: IFeedsRepository):
        self.feeds_Repo = repo
    
    async def create_feedback(self, dto: FeedbackCreateDTO):
        feedback = await self.feeds_Repo.create(dto)
        if not feedback:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                detail="Internal server error"
            )

        return FeedbackResponseDTO.model_validate(feedback)
    
    async def get_feedbacks(self, page: int = 0, limit: int = 25):
        feedbacks = await self.feeds_Repo.get_all(offset= page*25, limit=limit)
        total_count = await self.feeds_Repo.get_total()
        dto = FeedbacksResponseDTO(
            currentPage=page, 
            limit=limit, 
            feedbacks=[FeedbackResponseDTO.model_validate(feedback) for feedback in feedbacks], 
            totalPages=math.ceil(total_count / limit) if limit > 0 else 0
        )
        return dto
