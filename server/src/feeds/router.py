from fastapi import APIRouter, Depends, status
from .dtos import FeedbackCreateDTO, FeedbackResponseDTO
from .dependencies import get_feeds_service
from .service import FeedsService

feeds_router = APIRouter()

@feeds_router.post('/', status_code=status.HTTP_201_CREATED, response_model=FeedbackResponseDTO)
async def create_feedback(
    create_dto: FeedbackCreateDTO, 
    feeds_service: FeedsService = Depends(get_feeds_service)
):
    result = await feeds_service.create_feedback(create_dto)
    return result
    