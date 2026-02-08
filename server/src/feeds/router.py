from fastapi import APIRouter, Depends, status
from .dtos import FeedbackCreateDTO, FeedbackResponseDTO, FeedbacksResponseDTO, FeedbackUpdateDTO
from .dependencies import get_feeds_service
from .service import FeedsService
from src.auth.dependencies import TokenBearer
from src.background_tasks.client import inngest_client
from inngest import Event

feeds_router = APIRouter()
token_bearer = TokenBearer()

@feeds_router.post('/', status_code=status.HTTP_201_CREATED, response_model=FeedbackResponseDTO)
async def create_feedback(
    create_dto: FeedbackCreateDTO, 
    token_details=Depends(token_bearer),
    feeds_service: FeedsService = Depends(get_feeds_service),
):
    result = await feeds_service.create_feedback(token_details['id'], create_dto)
    if not create_dto.category:
        await inngest_client.send(
            events=Event(
                name="feedback/categorize",
                data= {
                    "id": result.id,  
                    "title": result.title,
                    "detail": result.detail
                }
            )
        )
    return result

@feeds_router.get('/', status_code=status.HTTP_200_OK, response_model=FeedbacksResponseDTO)
async def get_feedbacks(
    page: int = 0,
    limit: int = 25,
    _ = Depends(token_bearer),
    feeds_service: FeedsService = Depends(get_feeds_service),
):
    result = await feeds_service.get_feedbacks(page=page, limit=limit)
    return result

@feeds_router.get('/{id}', status_code=status.HTTP_200_OK, response_model=FeedbackResponseDTO)
async def get_feedback(
    id: int, 
    _=Depends(token_bearer),
    feeds_service: FeedsService = Depends(get_feeds_service),
):
    result = await feeds_service.get_feedback(id)
    return result
    

@feeds_router.delete('/{id}')
async def delete_feedback(
    id: int, 
    _=Depends(token_bearer),
    feeds_service: FeedsService = Depends(get_feeds_service)
):
    await feeds_service.delete_feedback(id)
    return {'message': 'success'}


@feeds_router.patch('/{id}', status_code=status.HTTP_200_OK, response_model=FeedbackResponseDTO)
async def update_feedback(
    id: int,
    dto: FeedbackUpdateDTO,
    _=Depends(token_bearer),
    feeds_service: FeedsService = Depends(get_feeds_service)
):
    result = await feeds_service.update_feedback(id, dto)
    return result
