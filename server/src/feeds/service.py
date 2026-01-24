from .interfaces import IFeedsRepository
from .dtos import FeedbackCreateDTO, FeedbackResponseDTO
from fastapi import HTTPException, status

class FeedsService:
    def __init__(self, repo: IFeedsRepository):
        self.feeds_Repo = repo
    
    async def create_feedback(self, dto: FeedbackCreateDTO):
        feedback = await self.feeds_Repo.create(dto)
        if not feedback:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")

        return FeedbackResponseDTO.model_validate(feedback)
